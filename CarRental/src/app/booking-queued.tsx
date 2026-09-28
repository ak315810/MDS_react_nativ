import { StyleSheet, Text, View } from 'react-native';

export default function BookingQueuedScreen() {
  return (
    <View style={styles.container}>
      <Text>Booking Queued</Text>
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