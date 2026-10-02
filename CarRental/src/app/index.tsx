import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const [location, setLocation] = useState('Odense');
  const [pickupDate, setPickupDate] = useState('Select date');
  const [returnDate, setReturnDate] = useState('Select date');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Rental</Text>

      <Text style={styles.label}>Location</Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setLocation('Odense')}
      >
        <Text>{location}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Pick-up date</Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setPickupDate('02/10/2026')}
      >
        <Text>{pickupDate}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Return date</Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setReturnDate('05/10/2026')}
      >
        <Text>{returnDate}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push('/search')}
      >
        <Text style={styles.primaryButtonText}>Search cars</Text>
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