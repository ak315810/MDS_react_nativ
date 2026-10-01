import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../constants/theme';

const policies: string[] = [
  'Traffic and parking fines are passed on at their exact amount, plus a 150 DKK administrative fee per fine.',
  'Damage is charged up to the deposit amount, based on the damage report made at return.',
  'Fuel or battery: return the car with the same level, otherwise the missing amount is charged at cost.',
  'A valid driving licence is checked in person at the rental desk.',
];

export function PolicySummary() {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Fines, fees and damage policy</Text>
      {policies.map((policy) => (
        <Text key={policy} style={styles.item}>
          {'•'} {policy}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceSecondary,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  heading: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: 8,
  },
  item: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
    marginBottom: 6,
  },
});
