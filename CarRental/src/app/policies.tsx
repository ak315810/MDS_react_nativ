import { StyleSheet, Text, View } from 'react-native';

export default function PoliciesScreen() {
  return (
    <View style={styles.container}>
      <Text>Terms and Policies</Text>
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