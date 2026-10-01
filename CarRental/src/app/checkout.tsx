import { useNetInfo } from '@react-native-community/netinfo';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FilterChip } from '../components/FilterChip';
import { PolicySummary } from '../components/PolicySummary';
import { PriceSummary } from '../components/PriceSummary';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, typography } from '../constants/theme';
import { Car } from '../services/mockCars';
import { calculatePrice, formatDkk } from '../services/priceCalculator';
import { getCachedCars } from '../services/storageService';
import { submitBooking } from '../services/syncQueue';
import { BookingPayload, PaymentMethod } from '../services/syncTypes';

const paymentOptions: { method: PaymentMethod; label: string }[] = [
  { method: 'card', label: 'Card' },
  { method: 'apple_pay', label: 'Apple Pay' },
  { method: 'google_pay', label: 'Google Pay' },
];

const defaultLocationId = 'odense-central';

function addDays(date: Date, days: number): string {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().slice(0, 10);
}

export default function CheckoutScreen() {
  const { carId, days } = useLocalSearchParams<{ carId: string; days: string }>();
  const router = useRouter();
  const netInfo = useNetInfo();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingId] = useState<string>(
    () => 'booking_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7)
  );

  useEffect(() => {
    const loadCar = async () => {
      const cars = await getCachedCars();
      setCar(cars.find((c) => c.vehicleId === carId) ?? null);
      setLoading(false);
    };

    loadCar();
  }, [carId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  if (!car) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Car not found.</Text>
      </View>
    );
  }

  const breakdown = calculatePrice(car, Number(days) || 1);
  const today = new Date();
  const startDate = addDays(today, 0);
  const endDate = addDays(today, breakdown.days);
  const isOffline = netInfo.isConnected === false;

  const handlePay = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    const payload: BookingPayload = {
      bookingId,
      vehicleId: car.vehicleId,
      locationId: defaultLocationId,
      startDate,
      endDate,
      totalPrice: breakdown.totalToPay,
      payment: {
        paymentId: 'pay_' + bookingId,
        amount: breakdown.totalToPay,
        paymentMethod,
      },
    };

    try {
      const item = await submitBooking(payload);
      router.replace({ pathname: '/confirmation', params: { queueId: item.queueId } });
    } catch (e) {
      console.error('Booking submit error:', e);
      setError('The booking could not be saved on this device. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{car.brand} {car.model}</Text>
      <Text style={styles.dates}>{startDate} to {endDate}</Text>

      <PriceSummary breakdown={breakdown} />
      <PolicySummary />

      <Text style={styles.sectionLabel}>Payment method (simulated)</Text>
      <View style={styles.methods}>
        {paymentOptions.map((option) => (
          <FilterChip
            key={option.method}
            label={option.label}
            selected={paymentMethod === option.method}
            onPress={() => setPaymentMethod(option.method)}
          />
        ))}
      </View>

      {isOffline && (
        <Text style={styles.offline}>
          You are offline. Your booking will be queued and sent automatically when you reconnect.
        </Text>
      )}
      {error && <Text style={styles.error}>{error}</Text>}

      {submitting ? (
        <ActivityIndicator size="large" color={colors.blue} />
      ) : (
        <PrimaryButton title={`Pay ${formatDkk(breakdown.totalToPay)}`} onPress={handlePay} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    padding: 16,
  },
  centered: {
    flex: 1,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    color: colors.primary,
  },
  dates: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 16,
  },
  sectionLabel: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  methods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
    marginBottom: 16,
  },
  offline: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  error: {
    ...typography.bodySecondary,
    color: colors.red,
    marginBottom: 12,
  },
});
