import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { getCachedCars } from '../services/storageService';
import { Car } from '../services/mockCars';
import { CarCard } from '../components/CarCard';

export default function SearchScreen() {
  const [cars, setCars] = useState<Car[]>([]);

  const router = useRouter();

  const {
    fuel,
    doors,
    trunk,
  } = useLocalSearchParams<{
    fuel?: string;
    doors?: string;
    trunk?: string;
  }>();

  useEffect(() => {
    const loadCars = async () => {
      const storedCars = await getCachedCars();
      setCars(storedCars);
    };

    loadCars();
  }, []);

  const displayedCars = cars.filter((car) => {
    const matchesFuel =
      !fuel || car.fuelType === fuel;

    const matchesDoors =
      !doors || car.doors === Number(doors);

    const matchesTrunk =
      !trunk || car.trunkCapacity >= Number(trunk);

    return matchesFuel && matchesDoors && matchesTrunk;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Results</Text>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => router.push('/filters')}
        >
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayedCars}
        keyExtractor={(item) => item.vehicleId}
        renderItem={({ item }) => (
          <CarCard
            brand={item.brand}
            model={item.model}
            dailyPrice={item.dailyPrice}
            specs={item.fuelType}
            onPress={() => router.push(`/car/${item.vehicleId}`)}
          />
        )}
        initialNumToRender={5}
        windowSize={5}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No cars match the selected filters.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  filterButton: {
    backgroundColor: '#0047AB',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },

  filterButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 32,
  },
});