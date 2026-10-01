import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PolicySummary } from '../../components/PolicySummary';
import { PriceSummary } from '../../components/PriceSummary';
import { PrimaryButton } from '../../components/PrimaryButton';
import { colors, typography } from '../../constants/theme';
import { Car } from '../../services/mockCars';
import { calculatePrice, maxRentalDays, minRentalDays } from '../../services/priceCalculator';
import { getCachedCars } from '../../services/storageService';

export default function CarDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [days, setDays] = useState<number>(1);

  useEffect(() => {
    const loadCar = async () => {
      const cars = await getCachedCars();
      setCar(cars.find((c) => c.vehicleId === id) ?? null);
      setLoading(false);
    };

    loadCar();
  }, [id]);

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

  const breakdown = calculatePrice(car, days);

  const goToCheckout = () => {
    router.push({ pathname: '/checkout', params: { carId: car.vehicleId, days: String(days) } });
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{car.brand} {car.model}</Text>
      <Text style={styles.specs}>
        {car.productionYear} - {car.carType} - {car.fuelType} - {car.doors} doors - {car.trunkCapacity} L trunk - {car.color}
      </Text>

      <Text style={styles.sectionLabel}>Rental days</Text>
      <View style={styles.stepper}>
        <Pressable
          style={({ pressed }) => [styles.stepButton, pressed && styles.stepPressed]}
          onPress={() => setDays((d) => Math.max(minRentalDays, d - 1))}
          disabled={days <= minRentalDays}
          accessibilityLabel="Remove one day"
        >
          <Text style={styles.stepText}>-</Text>
        </Pressable>
        <Text style={styles.days}>{days}</Text>
        <Pressable
          style={({ pressed }) => [styles.stepButton, pressed && styles.stepPressed]}
          onPress={() => setDays((d) => Math.min(maxRentalDays, d + 1))}
          disabled={days >= maxRentalDays}
          accessibilityLabel="Add one day"
        >
          <Text style={styles.stepText}>+</Text>
        </Pressable>
      </View>

      <PriceSummary breakdown={breakdown} />
      <PolicySummary />

      <PrimaryButton title="Continue to booking" onPress={goToCheckout} />
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
  error: {
    ...typography.bodyPrimary,
    color: colors.red,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
  },
  specs: {
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
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepPressed: {
    backgroundColor: colors.surfaceSecondary,
  },
  stepText: {
    ...typography.h2,
    color: colors.blue,
  },
  days: {
    ...typography.h2,
    color: colors.primary,
    minWidth: 48,
    textAlign: 'center',
  },
});
