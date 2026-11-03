import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { borderRadius, colors, spacing, typography } from '../constants/theme';
import { maxRentalDays } from '../services/priceCalculator';

const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

interface Props {
  startDate: Date | null;
  endDate: Date | null;
  selecting: 'start' | 'end';
  onSelect: (day: Date) => void;
}

// Day counting in calculatePrice stops at maxRentalDays, so later return dates must not be selectable
export function lastReturnDate(start: Date): Date {
  return new Date(start.getFullYear(), start.getMonth(), start.getDate() + maxRentalDays);
}

export function DateRangeCalendar({ startDate, endDate, selecting, onSelect }: Props) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const firstShown = (selecting === 'end' ? endDate ?? startDate : startDate) ?? today;
  const [month, setMonth] = useState(new Date(firstShown.getFullYear(), firstShown.getMonth(), 1));

  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const leadingBlanks = (month.getDay() + 6) % 7;
  const canGoBack = month.getTime() > new Date(today.getFullYear(), today.getMonth(), 1).getTime();

  const isDisabled = (day: Date) => {
    if (day < today) return true;
    if (selecting === 'end' && startDate) return day < startDate || day > lastReturnDate(startDate);
    return false;
  };

  return (
    <View>
      <View style={styles.header}>
        <Pressable
          style={styles.arrow}
          disabled={!canGoBack}
          onPress={() => setMonth(new Date(year, monthIndex - 1, 1))}
          accessibilityLabel="Previous month"
        >
          <Text style={[styles.arrowText, !canGoBack && styles.disabledText]}>{'<'}</Text>
        </Pressable>
        <Text style={styles.monthTitle}>
          {month.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
        </Text>
        <Pressable
          style={styles.arrow}
          onPress={() => setMonth(new Date(year, monthIndex + 1, 1))}
          accessibilityLabel="Next month"
        >
          <Text style={styles.arrowText}>{'>'}</Text>
        </Pressable>
      </View>

      <View style={styles.grid}>
        {weekDays.map((name) => (
          <View key={name} style={styles.cell}>
            <Text style={styles.weekDay}>{name}</Text>
          </View>
        ))}
        {Array.from({ length: leadingBlanks }, (_, index) => (
          <View key={`blank-${index}`} style={styles.cell} />
        ))}
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = new Date(year, monthIndex, index + 1);
          const time = day.getTime();
          const disabled = isDisabled(day);
          const isEdge = time === startDate?.getTime() || time === endDate?.getTime();
          const inRange = Boolean(startDate && endDate && day > startDate && day < endDate);

          return (
            <View key={time} style={styles.cell}>
              <Pressable
                style={[styles.day, inRange && styles.dayInRange, isEdge && styles.daySelected]}
                disabled={disabled}
                onPress={() => onSelect(day)}
                accessibilityLabel={day.toDateString()}
              >
                <Text
                  style={[
                    styles.dayText,
                    disabled && styles.disabledText,
                    isEdge && styles.daySelectedText,
                  ]}
                >
                  {index + 1}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  arrow: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    ...typography.h2,
    color: colors.turquoise,
  },
  monthTitle: {
    ...typography.h2,
    color: colors.primary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    paddingVertical: 2,
  },
  weekDay: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  day: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayInRange: {
    backgroundColor: colors.border,
  },
  daySelected: {
    backgroundColor: colors.turquoise,
  },
  dayText: {
    ...typography.bodySecondary,
    color: colors.primary,
  },
  daySelectedText: {
    color: colors.surface,
    fontWeight: '700',
  },
  disabledText: {
    color: colors.border,
  },
});
