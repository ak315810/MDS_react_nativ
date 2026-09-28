import { useState, useEffect } from 'react';
import { BookingPayload, SyncQueueItem } from '../services/syncTypes';
import { enqueueBooking, getNetworkStatus, getQueue, processQueue, setNetworkStatus } from '../services/syncQueue';

export function useSyncStatus() {
    const [queue, setQueue] = useState<SyncQueueItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isOnline, setIsOnline] = useState<boolean>(getNetworkStatus());
    
    async function refreshQueue(): Promise<void> {   
        const data = await getQueue();
        setQueue(data);
        setLoading(false);
        }
    
    async function addBooking(bookingData: BookingPayload): Promise<SyncQueueItem> {
        const item = await enqueueBooking(bookingData);
        await refreshQueue();
        return item;
        }
    
    function toggleOnline(value: boolean): void {
        setNetworkStatus(value);
        setIsOnline(value);
        refreshQueue();
        }

    useEffect(() => {
        refreshQueue();

        const timer = setInterval(async() => {
            await processQueue();
            await refreshQueue();
        }, 5000);

        return() => clearInterval(timer);
    }, []);

    return {queue, loading, refreshQueue};
    }