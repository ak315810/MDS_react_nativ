import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />

      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="search" options={{ title: 'Search Results' }} />
        <Stack.Screen name="explore" options={{ title: 'Explore' }} />
        <Stack.Screen name="car/[id]" options={{ title: 'Car Details' }} />
        <Stack.Screen name="checkout" options={{ title: 'Booking Details' }} />
        <Stack.Screen name="payment" options={{ title: 'Payment Details'}} />
      </Stack>
    </ThemeProvider>
  );
}