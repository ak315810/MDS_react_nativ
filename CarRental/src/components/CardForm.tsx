import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { borderRadius, colors, spacing, typography } from '../constants/theme';

export interface CardDetails {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

export const emptyCard: CardDetails = { number: '', name: '', expiry: '', cvc: '' };

interface Props {
  card: CardDetails;
  onChange: (card: CardDetails) => void;
}

export function cardError(card: CardDetails, now: Date = new Date()): string | null {
  if (card.number.replace(/\s/g, '').length !== 16) return 'Enter the 16 digits of the card number.';
  if (!card.name.trim()) return 'Enter the name on the card.';

  const expiry = card.expiry.match(/^(\d{2})\/(\d{2})$/);
  const month = expiry ? Number(expiry[1]) : 0;
  if (!expiry || month < 1 || month > 12) return 'Enter the expiry date as MM/YY.';
  // Day 0 of the next month is the last day of the expiry month
  if (new Date(2000 + Number(expiry[2]), month, 0, 23, 59, 59) < now) return 'This card has expired.';

  if (card.cvc.length !== 3) return 'Enter the 3-digit CVC.';
  return null;
}

function formatNumber(text: string): string {
  return text.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
}

function formatExpiry(text: string): string {
  const digits = text.replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

export function CardForm({ card, onChange }: Props) {
  return (
    <View style={styles.form}>
      <Text style={styles.note}>Simulated payment. Do not enter a real card. Try 4242 4242 4242 4242.</Text>

      <Text style={styles.label}>Card number</Text>
      <TextInput
        style={styles.input}
        value={card.number}
        onChangeText={(text) => onChange({ ...card, number: formatNumber(text) })}
        keyboardType="number-pad"
        placeholder="1234 5678 9012 3456"
        autoComplete="off"
        accessibilityLabel="Card number"
      />

      <Text style={styles.label}>Name on card</Text>
      <TextInput
        style={styles.input}
        value={card.name}
        onChangeText={(text) => onChange({ ...card, name: text })}
        autoCapitalize="words"
        placeholder="Full name"
        autoComplete="off"
        accessibilityLabel="Name on card"
      />

      <View style={styles.row}>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Expiry</Text>
          <TextInput
            style={styles.input}
            value={card.expiry}
            onChangeText={(text) => onChange({ ...card, expiry: formatExpiry(text) })}
            keyboardType="number-pad"
            placeholder="MM/YY"
            autoComplete="off"
            accessibilityLabel="Expiry date"
          />
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>CVC</Text>
          <TextInput
            style={styles.input}
            value={card.cvc}
            onChangeText={(text) => onChange({ ...card, cvc: text.replace(/\D/g, '').slice(0, 3) })}
            keyboardType="number-pad"
            placeholder="123"
            secureTextEntry
            autoComplete="off"
            accessibilityLabel="CVC"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: spacing.md,
  },
  note: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  input: {
    ...typography.bodyPrimary,
    color: colors.primary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: 12,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    columnGap: spacing.sm,
  },
  rowItem: {
    flex: 1,
  },
});
