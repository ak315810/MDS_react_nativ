import { StyleSheet, Text, View } from 'react-native';

export default function PaymentScreen() {
  return (
    <View style={styles.container}>
      <Text>Payment Details</Text>
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