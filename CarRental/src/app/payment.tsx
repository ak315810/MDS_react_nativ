import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function PaymentScreen() {
  return (
    <View style={styles.container}>
      <Text>Payment Details</Text>
      <Link href="/confirmation">
        <Text>Confirm Booking</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});