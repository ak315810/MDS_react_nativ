import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Link } from 'expo-router';

// --------------------------------------------------------
// IMPORTY Z FAZY 1 - upewnij się, że ścieżki się zgadzają!
// --------------------------------------------------------

// Osoba 1: Komponenty UI
import { PrimaryButton } from '../components/PrimaryButton';
import { FilterChip } from '../components/FilterChip';
import { CarCard } from '../components/CarCard';
import { SyncBadge } from '../components/SyncBadge';

// Osoba 3: Dane i Cache
import { mockCars } from '../services/mockCars';

// Osoba 4: Kolejka Offline
// Jeśli Osoba 4 jeszcze tego nie zmergowała, zakomentuj te dwie linie:
import { enqueueBooking } from '../services/syncQueue';
import { useSyncStatus } from '../hooks/useSyncStatus';

export default function PhaseOneTestDashboard() {
  // Stan do testowania danych od Osoby 3
  const [cars, setCars] = useState<any[]>([]);
  
  // Symulacja statusu od Osoby 4 (odkomentuj hooka, jeśli go macie)
  const currentSyncStatus = useSyncStatus(); 
  //const currentSyncStatus = 'Queued'; // Tymczasowy mock: 'Confirmed', 'Queued' lub 'Failed'

  useEffect(() => {
    // Symulacja ładowania danych z cache (Osoba 3)
    if (mockCars) {
      setCars(mockCars);
    }
  }, []);

  const handleOfflineBookingTest = async () => {
    // Używamy nowej funkcji od Osoby 4!
    if (cars.length === 0) return;
    try {
      await enqueueBooking({ 
        bookingId: "TEST-" + Math.floor(Math.random() * 1000), 
        vehicleId: cars[0].vehicleId 
      });
      Alert.alert("Sukces", "Rezerwacja dodana do kolejki (Queued)!");
    } catch (e) {
      Alert.alert("Błąd", "Nie udało się dodać do kolejki.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>Panel Testowy: Faza 1</Text>

      {/* TEST: Osoba 1 (UI) & Osoba 3 (Dane) */}
      { <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Komponenty UI & Dane (CarCard)</Text>
        {cars.length > 0 ? (
          <CarCard 
            make={cars[0].brand} 
            model={cars[0].model} 
            price={cars[0].dailyPrice} 
            specs={`${cars[0].fuelType} • doors: ${cars[0].doors}`} 
            onPress={() => Alert.alert("Klik", `Kliknięto auto: ${cars[0].brand}`)} 
          />
        ) : (
          <Text style={styles.errorText}>Brak danych w mockCars!</Text>
        )}
        
        <View style={styles.row}>
          <FilterChip label="Electric" selected={true} onPress={() => {}} />
          <FilterChip label="Diesel" selected={false} onPress={() => {}} />
        </View>
      </View> }

      {/* TEST: Osoba 4 (Status Offline) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Status Offline (SyncBadge)</Text>
        
        <SyncBadge status={currentSyncStatus || 'Queued'} />
        
        <View style={{ marginTop: 10 }}>
          <PrimaryButton 
            title="Symuluj rezerwację offline" 
            onPress={handleOfflineBookingTest} 
          />
        </View>
      </View>

      {/* TEST: Osoba 2 (Nawigacja) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Szkielet Nawigacji (Puste pokoje)</Text>
        <Link href="/search" style={styles.link}>Przejdź do: Search</Link>
        <Link href="/car/1" style={styles.link}>Przejdź do: Car Details</Link>
        <Link href="/checkout" style={styles.link}>Przejdź do: Checkout</Link>
        <Link href="/bookings" style={styles.link}>Przejdź do: Bookings</Link>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 20 },
  mainTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  section: { backgroundColor: '#F9F9F9', padding: 15, borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: '#EEE' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  row: { flexDirection: 'row', gap: 10, marginTop: 15 },
  link: { color: '#0047AB', fontSize: 16, marginVertical: 8, textDecorationLine: 'underline' },
  errorText: { color: 'red', fontStyle: 'italic' }
});