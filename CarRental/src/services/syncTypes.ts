// 1. We define the possible sync status that our app will have (NFR-K3)
export type SyncStatus = "queued" | "syncing" | "confirmed" | "failed" | "cancelled";

export type PaymentMethod = "card" | "apple_pay" | "google_pay";

export interface PaymentInfo {  paymentId: string;
                                amount: number;
                                paymentMethod: PaymentMethod;
                                }

export interface BookingPayload {   bookingId: string;
                                    vehicleId: string;
                                    locationId: string;
                                    userId?: string; // Browsing is allowed without an account
                                    startDate: string;
                                    endDate: string;
                                    totalPrice: number;
                                    payment: PaymentInfo;
                                    }

export interface SyncQueueItem {queueId: string;
                                operationType: "create_booking"; // We will implement the "cancel_booking" option in the future
                                retryCount: number;
                                syncStatus: SyncStatus;
                                bookingData: BookingPayload;
                                createdAt: number;
                                referenceCode?: string; //Filled when confirmed
                                errorMessage?: string;
                                nextRetryAt?: number;
                                }

export const retryDelayMs = [5000, 15000, 60000, 300000];