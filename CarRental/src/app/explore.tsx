import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function ExploreScreen() {
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
        <Marker
          coordinate={{
            latitude: 55.4038,
            longitude: 10.4024,
          }}
          title="Available car"
          description="Toyota Yaris"
        />
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