import NetInfo from '@react-native-community/netinfo';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { setNetworkStatus } from '../services/syncQueue';

export default function RootLayout() {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkStatus(state.isConnected !== false);
    });
    return unsubscribe;
  }, []);

  return (
    <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="search" options={{ title: 'Search Results' }} />
        <Stack.Screen name="explore" options={{ title: 'Explore' }} />
        <Stack.Screen name="car/[id]" options={{ title: 'Car Details' }} />
        <Stack.Screen name="checkout" options={{ title: 'Booking Details' }} />
        <Stack.Screen name="payment" options={{ title: 'Payment Details'}} />
        <Stack.Screen name="confirmation" options={{ title: 'Booking Confirmation'}} />
        <Stack.Screen name="bookings" options={{ title: 'My Bookings'}} />
        <Stack.Screen name="booking-queued" options={{ title: 'Booking Queued'}} />
        <Stack.Screen name="booking-failed" options={{ title: 'Booking Failed'}} />
        <Stack.Screen name="account" options={{ title: 'User Account'}} />
        <Stack.Screen name="filters" options={{ title: 'Filters'}} />
        <Stack.Screen name="policies" options={{ title: 'Terms and Policies'}} />
      </Stack>
  );
}
