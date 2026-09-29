import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';
interface Props {
  brand: string;
  model: string;
  dailyPrice: number;
  specs?: string;
  imageUrl?: string;
  onPress?: () => void;
}

export function CarCard({ brand, model, dailyPrice, specs, imageUrl, onPress }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={{ uri: imageUrl }} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.title}>{brand} {model}</Text>
          <Text style={styles.specs}>{specs}</Text>
          <Text style={styles.dailyPrice}>{dailyPrice} DKK/day </Text>
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
    backgroundColor: colors.surface,
    borderColor: colors.border,
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
    backgroundColor: colors.surfaceSecondary,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  specs: {
    fontSize: 13,
    color: colors.textSecondary,
    marginVertical: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.blue,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.surface,
    fontWeight: 'bold',
  },
});