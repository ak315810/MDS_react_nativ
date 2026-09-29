import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { color } from '../constants/theme';

interface Props {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export function FilterChip({ label, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: color.surface,
    borderColor: color.border,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: color.blue,
    borderColor: color.blue,
  },
  text: {
    color: color.textSecondary,
    fontSize: 13,
  },
  textSelected: {
    color: color.surface,
    fontWeight: 'bold',
  },
});