import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { color } from '../constants/theme';
interface Props {
  make: string;
  model: string;
  price: number;
  specs?: string;
  imageUrl?: string;
  onPress?: () => void;
}

export function CarCard({ make, model, price, specs, imageUrl, onPress }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={{ uri: imageUrl }} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.title}>{make} {model}</Text>
          <Text style={styles.specs}>{specs}</Text>
          <Text style={styles.price}>{price} kr / day</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Book</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.surface,
    borderColor: color.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: 72,
    height: 52,
    borderRadius: 6,
    backgroundColor: color.surfaceSecondary,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.primary,
  },
  specs: {
    fontSize: 13,
    color: color.textSecondary,
    marginVertical: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: color.primary,
  },
  button: {
    backgroundColor: color.blue,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: color.surface,
    fontWeight: 'bold',
  },
});