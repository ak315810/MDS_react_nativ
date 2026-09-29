import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ekran 2 (Explore / Tab Two)</Text>
      
      {/* Link testowy do nawigacji */}
      <Link href="/" style={styles.link}>Wróć na ekran główny</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Wymagane czyste, białe tło dla Fazy 1
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  link: {
    color: '#0047AB',
    marginTop: 20,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});
