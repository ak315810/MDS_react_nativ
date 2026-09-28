import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function CheckoutScreen() {
  return (
    <View style={styles.container}>
      <Text>Booking Details</Text>
      <Link href="/payment">
        <Text>Continue to Payment</Text>
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