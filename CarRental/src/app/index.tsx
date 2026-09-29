import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Rental</Text>

      <Text style={styles.subtitle}>Find a car by search or map</Text>

      <Link href="/search" style={styles.link}>Search cars</Link>

      <Link href="/explore" style={styles.link}>View map</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },

  link: {
    fontSize: 18,
    marginBottom: 16,
  },
});