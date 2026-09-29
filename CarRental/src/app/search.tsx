import { Link } from 'expo-router';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { mockCars } from '../services/mockCars'; 
import { CarCard } from '../components/CarCard';

export default function SearchScreen() {
  const [displayedCars, setDisplayedCars] = useState(mockCars);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results</Text>
      
      <FlatList
        data={displayedCars}
        keyExtractor={(item) => item.vehicleId}
        renderItem={({ item }) => (
          <CarCard 
            make={item.brand}       // Adaptado: de brand (datos) a make (UI)
            model={item.model} 
            price={item.dailyPrice} // Mantenemos dailyPrice
            specs={item.fuelType}   // Adaptado: pasamos el fuelType al campo specs
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
  }
});