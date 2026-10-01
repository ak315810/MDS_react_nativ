import { Car } from './mockCars';

export interface PriceBreakdown {
  dailyPrice: number;
  days: number;
  rentalTotal: number;
  extraFees: number;
  deposit: number;
  totalToPay: number;
}

export const minRentalDays = 1;
export const maxRentalDays = 30;

export function calculatePrice(car: Car, days: number): PriceBreakdown {
  const safeDays = Math.min(Math.max(Math.round(days), minRentalDays), maxRentalDays);
  const rentalTotal = car.dailyPrice * safeDays;
  const extraFees = 0;

  return {
    dailyPrice: car.dailyPrice,
    days: safeDays,
    rentalTotal,
    extraFees,
    deposit: car.deposit,
    totalToPay: rentalTotal + extraFees + car.deposit,
  };
}

export function formatDkk(amount: number): string {
  return `${amount} DKK`;
}
