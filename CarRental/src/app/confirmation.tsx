import { StyleSheet, Text, View } from 'react-native';

export default function ConfirmationScreen() {
  return (
    <View style={styles.container}>
      <Text>Booking Confirmation</Text>
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