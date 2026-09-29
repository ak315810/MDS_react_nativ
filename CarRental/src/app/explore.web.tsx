import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ExploreWebScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map Availability</Text>
      <Text>
        The interactive map is available on the mobile version.
      </Text>
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
    marginBottom: 12,
  },
});