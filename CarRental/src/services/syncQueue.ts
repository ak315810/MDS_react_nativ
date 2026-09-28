import AsyncStorage from "@react-native-async-storage/async-storage";
import { SyncQueueItem, BookingPayload, retryDelayMs } from "./syncTypes";
const storageKey = '@car_rental_sync_queue';

let isOnline: boolean = true;
let isProcessing: boolean = false;

export function setNetworkStatus(online:boolean): void{
    isOnline = online;
    if (isOnline) {
        processQueue();
        }
    }

export function getNetworkStatus(): boolean {
    return isOnline;
    }

export async function getQueue(): Promise<SyncQueueItem[]> {   
    const data = await AsyncStorage.getItem(storageKey);
    if (data != null) {
                        return JSON.parse(data);
                        }
    return [];
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

export async function processQueue(): Promise<void> {
    if (isProcessing || !isOnline) {
        return;
    }

    isProcessing = true;

    try {
        const queue = await getQueue();
        const now = Date.now();
        let modified = false;
        
        for (let i=0; i < queue.length; i++) {
            const item = queue[i];
            
            if (item.syncStatus === "syncing") {
                item.syncStatus = "queued";
                modified = true;
                }
            const canRetry = !item.nextRetryAt || now >= item.nextRetryAt;

            if (item.syncStatus === "queued" && canRetry) {
                item.syncStatus = "syncing";
                modified = true;
                await saveQueue(queue);
                
                try {
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

                        if (error.message === "car_unavailable" || (error.response && error.response.status === 409)) {
                            item.syncStatus = "failed";
                            item.errorMessage = "Booking failed: car no longer available";
                            item.nextRetryAt = undefined;
                            } 
                        else {
                            const delay = retryDelayMs[item.retryCount] ?? 300000;
                            item.nextRetryAt = Date.now() + delay;
                            item.retryCount += 1;
                            item.syncStatus = "queued";
                            }
                    }
                    modified = true;
                }
            }
            
            if (modified) {
                await saveQueue(queue);
                }
            } finally {
                isProcessing = false;
            }
        }
