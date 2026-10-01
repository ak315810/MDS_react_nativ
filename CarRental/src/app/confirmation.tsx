import { Link, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SyncBadge } from '../components/SyncBadge';
import { colors, typography } from '../constants/theme';
import { useSyncStatus } from '../hooks/useSyncStatus';
import { toBadgeStatus } from '../services/bookingStatus';
import { formatDkk } from '../services/priceCalculator';

export default function ConfirmationScreen() {
  const { queueId } = useLocalSearchParams<{ queueId: string }>();
  const { queue, loading } = useSyncStatus();
  const item = queue.find((i) => i.queueId === queueId);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Booking not found.</Text>
        <Link href="/" style={styles.link}>Back to home</Link>
      </View>
    );
  }

  const status = item.syncStatus;

  return (
    <View style={styles.container}>
      <View>
        <SyncBadge status={toBadgeStatus(status)} />
      </View>

      {status === 'confirmed' && (
        <>
          <Text style={styles.title}>Booking confirmed</Text>
          <Text style={styles.label}>Booking reference</Text>
          <Text style={styles.reference}>{item.referenceCode}</Text>
        </>
      )}

      {(status === 'queued' || status === 'syncing') && (
        <>
          <Text style={styles.title}>Booking queued</Text>
          <Text style={styles.message}>
            Your booking is saved on this phone and will be sent automatically when you are
            back online. Your reference code will appear here once it is confirmed.
          </Text>
        </>
      )}

      {(status === 'failed' || status === 'cancelled') && (
        <>
          <Text style={styles.title}>Booking not completed</Text>
          <Text style={styles.error}>{item.errorMessage ?? 'This booking was cancelled.'}</Text>
        </>
      )}

      <Text style={styles.message}>
        {item.bookingData.startDate} to {item.bookingData.endDate} - {formatDkk(item.bookingData.totalPrice)}
      </Text>

      <Link href="/bookings" style={styles.link}>My bookings</Link>
      <Link href="/" style={styles.link}>Back to home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  label: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
  },
  reference: {
    ...typography.displayPrice,
    color: colors.primary,
    marginBottom: 8,
  },
  message: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 12,
  },
  error: {
    ...typography.bodySecondary,
    color: colors.red,
    textAlign: 'center',
    marginBottom: 12,
  },
  link: {
    ...typography.bodyPrimary,
    color: colors.blue,
    marginTop: 12,
  },
});
