import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SyncBadge } from '../components/SyncBadge';
import { colors, typography } from '../constants/theme';
import { useSyncStatus } from '../hooks/useSyncStatus';
import { toBadgeStatus } from '../services/bookingStatus';
import { Car } from '../services/mockCars';
import { formatDkk } from '../services/priceCalculator';
import { getCachedCars } from '../services/storageService';
import { cancelQueueItem } from '../services/syncQueue';
import { SyncQueueItem } from '../services/syncTypes';

export default function BookingsScreen() {
  const { queue, loading, refreshQueue } = useSyncStatus();
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    getCachedCars().then(setCars);
  }, []);

  const carName = (vehicleId: string): string => {
    const car = cars.find((c) => c.vehicleId === vehicleId);
    return car ? `${car.brand} ${car.model}` : 'Car';
  };

  const handleCancel = async (queueId: string) => {
    await cancelQueueItem(queueId);
    await refreshQueue();
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  const bookings = [...queue].sort((a, b) => b.createdAt - a.createdAt);

  const renderItem = ({ item }: { item: SyncQueueItem }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>{carName(item.bookingData.vehicleId)}</Text>
        <SyncBadge status={toBadgeStatus(item.syncStatus)} />
      </View>
      <Text style={styles.detail}>
        {item.bookingData.startDate} to {item.bookingData.endDate}
      </Text>
      <Text style={styles.detail}>{formatDkk(item.bookingData.totalPrice)}</Text>
      {item.referenceCode && <Text style={styles.reference}>Ref: {item.referenceCode}</Text>}
      {item.errorMessage && <Text style={styles.error}>{item.errorMessage}</Text>}

      {item.syncStatus === 'queued' && (
        <Pressable
          style={({ pressed }) => [styles.cancelButton, pressed && styles.cancelPressed]}
          onPress={() => handleCancel(item.queueId)}
        >
          <Text style={styles.cancelText}>Cancel booking</Text>
        </Pressable>
      )}
    </View>
  );

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={bookings}
      keyExtractor={(item) => item.queueId}
      renderItem={renderItem}
      ListEmptyComponent={<Text style={styles.empty}>You have no bookings yet.</Text>}
    />
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
  card: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    ...typography.h2,
    color: colors.primary,
  },
  detail: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
  },
  reference: {
    ...typography.bodySecondary,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 4,
  },
  error: {
    ...typography.bodySecondary,
    color: colors.red,
    marginTop: 4,
  },
  cancelButton: {
    marginTop: 8,
    minHeight: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelPressed: {
    backgroundColor: colors.surfaceSecondary,
  },
  cancelText: {
    ...typography.bodySecondary,
    color: colors.red,
    fontWeight: 'bold',
  },
  empty: {
    ...typography.bodyPrimary,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 32,
  },
});
