import React from 'react';
import { Button, View } from 'react-native';
import { useUserStore } from '../stores/UserStore';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { cardStyle, textColor } from '../styles/Styles';
import { useColorScheme } from '~/lib/useColorScheme';

// --- Component to manage the counter using zustand ---
const CounterControls = () => {
  const { colors, isDarkColorScheme } = useColorScheme();
  const userId = useUserStore((state) => state.userId);
  const increment = useUserStore((state) => state.increment);
  const decrement = useUserStore((state) => state.decrement);

  return (
    <View style={[styles.section, cardStyle(isDarkColorScheme, colors)]}>
      <Text style={[styles.header, textColor(isDarkColorScheme)]}>Manage User ID</Text>
      <Text style={[styles.counter, textColor(isDarkColorScheme)]}>Current User ID: {userId}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Decrement" onPress={decrement} />
        <View style={styles.buttonSpacer} />
        <Button title="Increment" onPress={increment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginVertical: 15,
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
    letterSpacing: 0.5,
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
  buttonSpacer: {
    width: 20,
  },
  errorText: {
    color: 'red',
  },
});

export default CounterControls;
