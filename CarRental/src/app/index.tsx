import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { DateRangeCalendar, lastReturnDate } from '../components/DateRangeCalendar';
import { PrimaryButton } from '../components/PrimaryButton';
import { useBooking } from '../context/BookingContext';

export default function HomeScreen() {
  const router = useRouter();

  const {location, startDate, endDate, setBookingDetails, calculateDays} = useBooking();

  const [dateError, setDateError] = useState<string | null>(null);
  const [selecting, setSelecting] = useState<'start' | 'end' | null>(null);

  const selectDay = (day: Date) => {
    if (selecting === 'start') {
      const keepEnd = endDate && endDate >= day && endDate <= lastReturnDate(day);
      setBookingDetails(location, day, keepEnd ? endDate : null);
      setSelecting('end');
      return;
      }
    setBookingDetails(location, startDate, day);
    setSelecting(null);
    };

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
        onPress={() => setBookingDetails('Odense', startDate, endDate)}
      >
        <Text>{location || 'Select location'}</Text>
      </TouchableOpacity>


      <Text style={styles.label}>Pick-up date</Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setSelecting('start')}
      >
        <Text>{startDate ? startDate?.toLocaleDateString(): 'Select date'}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Return date</Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setSelecting(startDate ? 'end' : 'start')}
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

      {selecting && (
        <Modal transparent animationType="fade" onRequestClose={() => setSelecting(null)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>
                {selecting === 'start' ? 'Select pick-up date' : 'Select return date'}
              </Text>
              <DateRangeCalendar
                startDate={startDate}
                endDate={endDate}
                selecting={selecting}
                onSelect={selectDay}
              />
              <TouchableOpacity style={styles.secondaryButton} onPress={() => setSelecting(null)}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    maxWidth: 400,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});