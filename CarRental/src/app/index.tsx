import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { PrimaryButton } from '../components/PrimaryButton';
import { useBooking } from '../context/BookingContext';

export default function HomeScreen() {
  const router = useRouter();

  const {location, startDate, endDate, setBookingDetails, calculateDays} = useBooking();

  const daysFromToday = (n: number) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + n);
    return d;
    };

  const [dateError, setDateError] = useState<string | null>(null);

  const handleSearch = () => {
    if (!location) {
      setDateError('Please select a location.');
      return;
      }
    if (!startDate || !endDate) {
      setDateError('Please select pick-up and return dates');
      return;
      }
    if (endDate < startDate) {
      setDateError('Return date must be after the pick-up date.');
      return;
      }
    setDateError(null);
    router.push('/search');
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Rental</Text>

      <Text style={styles.label}>Location</Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setBookingDetails(location || 'Odense', startDate || daysFromToday(1), endDate || daysFromToday(4))}
      >
        <Text>{location || 'Select location'}</Text>
      </TouchableOpacity>


      <Text style={styles.label}>Pick-up date</Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setBookingDetails(location, daysFromToday(1), endDate || daysFromToday(4))}
      >
        <Text>{startDate ? startDate?.toLocaleDateString(): 'Select date'}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Return date</Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setBookingDetails(location, startDate || daysFromToday(1), daysFromToday(4))}
      >
        <Text>{endDate ? endDate?.toLocaleDateString(): 'Select date'}</Text>
      </TouchableOpacity>

      {startDate && endDate && (
        <Text style={{marginBottom: 12, color: '#0047AB', fontWeight: '600' }}>
          Total number of booking days: {calculateDays()}
        </Text>
      )}

      {dateError && (
        <Text style={{ color: '#C0392B', marginBottom: 8 }}>{dateError}</Text>
      )}

      <PrimaryButton
        title="Search cars"
        onPress={handleSearch}/>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push('/filters')}
      >
        <Text>Filters</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push('/explore')}
      >
        <Text>View map</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 14,
    marginBottom: 18,
  },

  primaryButton: {
    backgroundColor: '#0047AB',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
});