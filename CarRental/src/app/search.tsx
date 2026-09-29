import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getCachedCars } from '../services/storageService';
import { Car } from '../services/mockCars';
import { CarCard } from '../components/CarCard';
import { FilterChip } from '../components/FilterChip';
import { useRouter } from 'expo-router';

export default function SearchScreen() {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedFuel, setSelectedFuel] = useState<string | null>(null);
  const [selectedDoors, setSelectedDoors] = useState<number | null>(null);
  const [selectedTrunk, setSelectedTrunk] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadCars = async () => {
      const storedCars = await getCachedCars();
      setCars(storedCars);
    };

    loadCars();
  }, []);

  const displayedCars = cars.filter((car) => {
    const matchesFuel =
      selectedFuel === null || car.fuelType === selectedFuel;
  
    const matchesDoors =
      selectedDoors === null || car.doors === selectedDoors;
  
    const matchesTrunk =
      selectedTrunk === null || car.trunkCapacity >= selectedTrunk;
  
    return matchesFuel && matchesDoors && matchesTrunk;
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results</Text>
      <View style={styles.filters}>
        <FilterChip
          label="All"
          selected={selectedFuel === null}
          onPress={() => setSelectedFuel(null)}
        />

        <FilterChip
          label="Electric"
          selected={selectedFuel === 'electric'}
          onPress={() => setSelectedFuel('electric')}
        />
        <FilterChip
          label="Hybrid"
          selected={selectedFuel === 'hybrid'}
          onPress={() => setSelectedFuel('hybrid')}
        />

        <FilterChip
          label="Diesel"
          selected={selectedFuel === 'diesel'}
          onPress={() => setSelectedFuel('diesel')}
        />

        <FilterChip
          label="Gasoline"
          selected={selectedFuel === 'gasoline'}
          onPress={() => setSelectedFuel('gasoline')}
        />
        <FilterChip
          label="Any doors"
          selected={selectedDoors === null}
          onPress={() => setSelectedDoors(null)}
        />

        <FilterChip
          label="2 doors"
          selected={selectedDoors === 2}
          onPress={() => setSelectedDoors(2)}
        />

        <FilterChip
          label="4 doors"
          selected={selectedDoors === 4}
          onPress={() => setSelectedDoors(4)}
        />

        <FilterChip
          label="5 doors"
          selected={selectedDoors === 5}
          onPress={() => setSelectedDoors(5)}
        />
        <FilterChip
          label="Any trunk"
          selected={selectedTrunk === null}
          onPress={() => setSelectedTrunk(null)}
        />

        <FilterChip
          label="300+ L"
          selected={selectedTrunk === 300}
          onPress={() => setSelectedTrunk(300)}
        />

        <FilterChip
          label="500+ L"
          selected={selectedTrunk === 500}
          onPress={() => setSelectedTrunk(500)}
        />
      </View>
      <FlatList
       style={{ width: '100%' }}
        data={displayedCars}
        keyExtractor={(item) => item.vehicleId}
        renderItem={({ item }) => (
          <CarCard 
            make={item.brand}       
            model={item.model} 
            price={item.dailyPrice} 
            specs={item.fuelType}   
            onPress={() => router.push(`/car/${item.vehicleId}`)}
            // imageUrl={item.image} // Si mockCars tiene imágenes, puedes pasarla aquí
          />
        )}
        initialNumToRender={5}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  filters: {
    flexDirection: 'row',
    marginBottom: 16,
  },
});