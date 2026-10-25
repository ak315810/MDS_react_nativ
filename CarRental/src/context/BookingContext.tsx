import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookingContextType {  location: string;
                                startDate: Date | null;
                                endDate: Date | null;
                                setBookingDetails: (location:string, startDate:Date, endDate:Date) => void;
                                calculateDays: () => number;
                            }

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({children}: {children:ReactNode}) {
    const [location, setLocation] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const setBookingDetails = (loc: string, start:Date | null, end:Date | null) => {
        setLocation(loc);
        setStartDate(start);
        setEndDate(end);
        };
    
    const calculateDays = () => {
        if (!startDate || !endDate) return 0;
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 1;
        };
    
    return (
        <BookingContext.Provider
            value = {{location, startDate, endDate, setBookingDetails, calculateDays}}>
            {children}
        </BookingContext.Provider>
        );
    }

export function useBooking() {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used inside a BookingProvider');
        }
    return context;
    }