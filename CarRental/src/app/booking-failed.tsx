import { StyleSheet, Text, View } from 'react-native';

export default function BookingFailedScreen() {
  return (
    <View style={styles.container}>
      <Text>Booking Failed</Text>
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