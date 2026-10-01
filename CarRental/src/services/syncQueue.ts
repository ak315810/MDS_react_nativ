import AsyncStorage from "@react-native-async-storage/async-storage";
import { SyncQueueItem, BookingPayload, retryDelayMs } from "./syncTypes";

const storageKey = '@car_rental_sync_queue';

let isOnline: boolean = true;
let isProcessing: boolean = false;
let currentRun: Promise<void> | null = null;

export function setNetworkStatus(online:boolean): void{
    isOnline = online;
    if (isOnline) {
        processQueue().catch((err) => console.error("Auto-sync error:", err));
        }
    }

export function getNetworkStatus(): boolean {
    return isOnline;
    }

export async function getQueue(): Promise<SyncQueueItem[]> {   
    const data = await AsyncStorage.getItem(storageKey);
    if (data === null) {
        return [];
        }
        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [];
            } catch(error) {
                console.error("Storage read error:", error);
                return [];
                }
    }

export async function saveQueue(queue: SyncQueueItem[]): Promise<void> {
    const jsonQueue = JSON.stringify(queue);
    try {   await AsyncStorage.setItem(storageKey, jsonQueue);
        } catch(e) {
            console.error("Storage write failure:", e);
            throw e;
            }
    } 

export async function enqueueBooking(bookingData: BookingPayload): Promise<SyncQueueItem> {
    const currentQueue = await getQueue();

    const existing = currentQueue.find(item => item.bookingData.bookingId === bookingData.bookingId);
    if (existing) {
        return existing;
        }

    const newItem: SyncQueueItem = {
        queueId: "queue_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
        operationType: "create_booking",
        retryCount: 0,
        syncStatus: "queued",
        bookingData: bookingData,
        createdAt: Date.now(),
        nextRetryAt: Date.now()
        };
    currentQueue.push(newItem);
    await saveQueue(currentQueue);

    if (isOnline) {
        processQueue();
        }

    return newItem;
    }

export async function submitBooking(bookingData: BookingPayload): Promise<SyncQueueItem>{
    const item = await enqueueBooking(bookingData);
    if (isOnline) {
        try {
        await processQueue();
        } catch(error) {
            console.error("Inmediate sync error:", error);
            }
        } 
        const fresh = await getQueue();
        return fresh.find((i) => i.queueId === item.queueId) || item;
    }


export async function cancelQueueItem(queueId: string): Promise<boolean> {
    const queue = await getQueue();
    const item = queue.find((i) => i.queueId === queueId);
    if (!item || item.syncStatus !== "queued") return false;
    
    item.syncStatus = "cancelled";
    item.nextRetryAt = undefined;
    await saveQueue(queue);
    return true;
    }

export function processQueue(): Promise<void> {
    if (isProcessing && currentRun) {
        return currentRun;
    }
    if (!isOnline) {
        return Promise.resolve();
    }
    currentRun = runQueue();
    return currentRun;
    }

async function runQueue(): Promise<void> {
    isProcessing = true;

    try {
        const queue = await getQueue();
        const now = Date.now();
        
        for (const item of queue) {
            if (item.syncStatus === "syncing") {
                item.syncStatus = "queued";
                }
            }
        

        for (let i=0; i < queue.length; i++) {
            const item = queue[i];
            const canRetry = !item.nextRetryAt || now >= item.nextRetryAt;
            
            if (item.syncStatus === "queued" && canRetry) {
                if (!isOnline) break;

                item.syncStatus = "syncing";
                await saveQueue(queue);
                
                try {
                    await new Promise((r) => setTimeout(r, 600));
                    if (!isOnline) {
                        throw new Error("Network offline");
                        }
                    
                    if (String(item.bookingData.vehicleId).toLowerCase() === "conflict"){
                        throw new Error("car_unavailable");
                        }

                    item.syncStatus = "confirmed";
                    item.referenceCode = "REF-" + Math.random().toString(36).substring(2, 8).toUpperCase();
                    item.errorMessage = undefined;
                    item.nextRetryAt = undefined;
                    } catch (error: any) {
                        if (error.message === "car_unavailable") {
                            item.syncStatus = "failed";
                            item.errorMessage = "Booking failed: car no longer available";
                            item.nextRetryAt = undefined;
                            } 
                        else {
                            const delay = retryDelayMs[item.retryCount] ?? 300000; // NFR-K2 (progressive backoff)
                            item.nextRetryAt = Date.now() + delay;
                            item.retryCount += 1;
                            item.syncStatus = "queued";
                            }
                        }
                    await saveQueue(queue);
                }
            }
        } finally {isProcessing = false;}
    }
    