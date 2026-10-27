/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

/**
 * Scandinavian Design System & Theme
 */

// new colors (Figma palette)
export const colors = {
  background: '#F4F5F7',       // Screen background
  surface: '#FFFFFF',          // Cards and containers
  surfaceSecondary: '#F7F7F7', // Chip bases and photo placeholders
  border: '#E5E5E5',          // Card borders and dividers

  primary: '#1A1D20',          // Headings and main text
  textSecondary: '#4A4A4A',    // Subtitles and specs

  turquoise: '#00A896',        // Primary action and slider
  blue: '#00A896',             // Backwards compatibility alias
  green: '#0F753C',            // Confirmed status
  red: '#CC1100',              // Failed status and errors
};

// Spacing and margins
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Border radius
export const borderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  full: 9999,
};

// Typography scale
export const typography = {
  displayPrice: {
    fontSize: 30,
    fontWeight: '700' as const,
    lineHeight: 36,
  },
  h1: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 30,
  },
  h2: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  bodyPrimary: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  bodySecondary: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
};

// Backwards compatibility with Expo template
export const Colors = {
  light: {
    text: colors.primary,
    background: colors.background,
    tint: colors.turquoise,
  },
  dark: {
    text: '#FFFFFF',
    background: '#121212',
    tint: colors.turquoise,
  },
};
export const Spacing = spacing;