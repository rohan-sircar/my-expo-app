import React from 'react';
import { Button, View } from 'react-native';
import { useUserStore } from '../stores/UserStore';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';

// --- Component to manage the counter using zustand ---
const CounterControls = () => {
  const userId = useUserStore((state) => state.userId);
  const increment = useUserStore((state) => state.increment);
  const decrement = useUserStore((state) => state.decrement);

  return (
    <View style={styles.section}>
      <Text style={styles.header}>Manage User ID</Text>
      <Text style={styles.counter}>Current User ID: {userId}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Decrement" onPress={decrement} />
        <View style={{ width: 20 }} />
        <Button title="Increment" onPress={increment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f5fcff',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  counter: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userCard: {
    marginTop: 10,
    backgroundColor: '#e8f4fd',
    padding: 10,
    borderRadius: 8,
  },
  userText: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
  },
});

export default CounterControls;
