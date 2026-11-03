import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PhotoGallery } from '../../components/PhotoGallery';
import { PolicySummary } from '../../components/PolicySummary';
import { PriceSummary } from '../../components/PriceSummary';
import { PrimaryButton } from '../../components/PrimaryButton';
import { colors, typography } from '../../constants/theme';
import { useBooking } from '../../context/BookingContext';
import { Car } from '../../services/mockCars';
import { calculatePrice } from '../../services/priceCalculator';
import { getCachedCars } from '../../services/storageService';

export default function CarDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { location, startDate, endDate, calculateDays } = useBooking();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  const goToCheckout = () => {
    router.push({ pathname: '/checkout', params: { carId: car.vehicleId } });
  };

  // Guests can reach this screen from the map before choosing anything on the home screen
  const hasBooking = Boolean(location && startDate && endDate);
  const breakdown = hasBooking ? calculatePrice(car, calculateDays()) : null;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <PhotoGallery images={car.images ?? []} />
      <Text style={styles.title}>{car.brand} {car.model}</Text>
      <Text style={styles.specs}>
        {car.productionYear} - {car.carType} - {car.fuelType} - {car.doors} doors - {car.trunkCapacity} L trunk
      </Text>
      <Text style={styles.specs}>Color: {car.color}</Text>

      {breakdown ? (
        <>
          <Text style={styles.specs}>
            {location} - {startDate?.toLocaleDateString()} to {endDate?.toLocaleDateString()} ({breakdown.days} {breakdown.days === 1 ? 'day' : 'days'})
          </Text>
          <PriceSummary breakdown={breakdown} />
          <PolicySummary />
          <PrimaryButton title="Continue to booking" onPress={goToCheckout} />
        </>
      ) : (
        <>
          <Text style={styles.specs}>Choose a location and dates to see the total price.</Text>
          <PolicySummary />
          <PrimaryButton title="Choose location and dates" onPress={() => router.push('/')} />
        </>
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
});
