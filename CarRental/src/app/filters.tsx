import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FilterChip } from '../components/FilterChip';

export default function FiltersScreen() {
  const router = useRouter();

  const [selectedFuel, setSelectedFuel] = useState<string | null>(null);
  const [selectedDoors, setSelectedDoors] = useState<number | null>(null);
  const [selectedTrunk, setSelectedTrunk] = useState<number | null>(null);

  const applyFilters = () => {
    router.push({
      pathname: '/search',
      params: {
        fuel: selectedFuel ?? '',
        doors: selectedDoors?.toString() ?? '',
        trunk: selectedTrunk?.toString() ?? '',
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filters</Text>

      <Text style={styles.sectionTitle}>Powertrain</Text>

      <View style={styles.filterGroup}>
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
      </View>

      <Text style={styles.sectionTitle}>Doors</Text>

      <View style={styles.filterGroup}>
        <FilterChip
          label="Any"
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
      </View>

      <Text style={styles.sectionTitle}>Trunk capacity</Text>

      <View style={styles.filterGroup}>
        <FilterChip
          label="Any"
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

      <TouchableOpacity
        style={styles.button}
        onPress={applyFilters}
      >
        <Text style={styles.buttonText}>Apply filters</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 10,
  },

  filterGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  button: {
    backgroundColor: '#0047AB',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});