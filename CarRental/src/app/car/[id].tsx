import { StyleSheet, Text, View } from 'react-native';

export default function CarDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>Car Details</Text>
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