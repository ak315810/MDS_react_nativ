import { Link } from 'expo-router';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { mockCars } from '../services/mockCars'; 

export default function SearchScreen() {
  const [displayedCars, setDisplayedCars] = useState(mockCars);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results</Text>
      
      <Link href="/car/1">
        <Text style={{ color: 'blue', marginBottom: 20 }}>View Car Details (Temporal)</Text>
      </Link>

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
  }
});