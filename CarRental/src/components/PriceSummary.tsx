import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../constants/theme';
import { PriceBreakdown, formatDkk } from '../services/priceCalculator';

interface Props {
  breakdown: PriceBreakdown;
}

interface RowProps {
  label: string;
  value: string;
}

function PriceRow({ label, value }: RowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export function PriceSummary({ breakdown }: Props) {
  const dayLabel = breakdown.days === 1 ? 'day' : 'days';

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Price breakdown</Text>

      <PriceRow
        label={`Rental (${formatDkk(breakdown.dailyPrice)} x ${breakdown.days} ${dayLabel})`}
        value={formatDkk(breakdown.rentalTotal)}
      />
      <PriceRow
        label="Extra fees / young-driver surcharge"
        value={formatDkk(breakdown.extraFees)}
      />
      <PriceRow
        label="Security deposit (refundable)"
        value={formatDkk(breakdown.deposit)}
      />

      <View style={styles.divider} />

      <Text style={styles.totalLabel}>Total to pay</Text>
      <Text style={styles.total}>{formatDkk(breakdown.totalToPay)}</Text>
      <Text style={styles.note}>
        No hidden fees. The deposit is refunded when the car is returned undamaged.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  heading: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
    flex: 1,
    marginRight: 8,
  },
  value: {
    ...typography.bodySecondary,
    color: colors.primary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  totalLabel: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
  },
  total: {
    ...typography.displayPrice,
    color: colors.primary,
  },
  note: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
