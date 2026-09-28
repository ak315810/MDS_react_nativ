/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

//modified
export const color = {
    surface: '#FFFFFF', //Pure White -> screen and card backgrounds
    surfaceSecondary: '#F7F7F7', // Off-white -> image backgrounds and chip bases
    border: '#E5E5E5', // Light Gray -> card borders and dividers
    primary: '#000000', // Pure Black -> headings, car titles, main prices
    textSecondary: '#4A4A4A', // Charcoal Gray -> specifications, queued status
    blue: '#0047AB', // Cobalt Blue -> primary actions, active filters
    red: '#CC1100', // Crimson Red -> errors, failed status
    green: '#0F753C', // Forest Green -> confirmed status
};

export const typography = {
    displayPrice: {
    fontSize: 32,
    fontWeight: '700' as const,
  },
  h1:{
    fontSize: 24,
    fontWeight: '600' as const,
  },
  h2:{
    fontSize: 18,
    fontWeight: '600' as const,
  },
  bodyPrimary:{
    fontSize: 16,
  },
  bodySecondary:{
    fontSize: 14,
  },
  caption:{
    fontSize: 12,
  },
};
