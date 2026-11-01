
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useRouter } from 'expo-router';

import { Car } from '../services/mockCars';
import { getCachedCars } from '../services/storageService';
import { Text } from 'expo-router/build/react-navigation';

export default function ExploreScreen() {
  const [cars, setCars] = useState<Car[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadCars = async () => {
      const storedCars = await getCachedCars();
      setCars(storedCars);
    };

    loadCars();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 55.4038,
          longitude: 10.4024,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      >
        {cars.map((car) => (
          <Marker
            key={car.vehicleId}
            coordinate={car.coordinates}
          >
            <Callout
              onPress={() => router.push(`/car/${car.vehicleId}`)}
            >
              <View>
                <Text>{car.brand} {car.model}</Text>
                <Text>{car.dailyPrice} DKK/day</Text>
                <Text>Tap to view details</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: '100%',
    height: '100%',
  },
});
