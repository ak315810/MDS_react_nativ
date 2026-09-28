import { StyleSheet, Text, View } from 'react-native';

export default function FiltersScreen() {
  return (
    <View style={styles.container}>
      <Text>Filters</Text>
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