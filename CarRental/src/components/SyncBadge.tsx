import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

interface Props {
  status: 'confirmed' | 'queued' | 'failed';
}

export function SyncBadge({ status }: Props) {
  //for confirmed booking state
  if (status === 'confirmed') {
    return (
      <View style={[styles.badge, { borderColor: colors.green }]}>
        <Text style={[styles.text, { color: colors.green }]}>Confirmed</Text>
      </View>
    );
  }

  //for failed booking state
  if (status === 'failed') {
    return (
      <View style={[styles.badge, { borderColor: colors.red }]}>
        <Text style={[styles.text, { color: colors.red }]}>Failed</Text>
      </View>
    );
  }

  //for queued offline state 
  return (
    <View style={[styles.badge, { borderColor: colors.textSecondary }]}>
      <Text style={[styles.text, { color: colors.textSecondary }]}>Queued</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.surface,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});