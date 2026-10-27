import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors } from '../constants/theme';

interface Props {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange: (val: number) => void;
}

export function PriceSlider({
  value,
  min = 300,
  max = 1500,
  step = 50,
  onValueChange,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Max daily price</Text>
        <Text style={styles.price}>{value} DKK/day</Text>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={colors.turquoise}
        maximumTrackTintColor={colors.border}
        thumbTintColor={colors.turquoise}
      />

      <View style={styles.row}>
        <Text style={styles.minMax}>{min} DKK</Text>
        <Text style={styles.minMax}>{max} DKK</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.primary,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.turquoise,
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: 4,
  },
  minMax: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});