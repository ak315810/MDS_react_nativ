import { StyleSheet, Text, View } from 'react-native';

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text>Search Results</Text>
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