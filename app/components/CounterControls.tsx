import React from 'react';
import { View } from 'react-native';
import { useUserStore } from '../stores/UserStore';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { cardStyle, textColor } from '../styles/Styles';
import { useColorScheme } from '~/lib/useColorScheme';
import { Button } from '~/components/nativewindui/Button';
import * as Style from '../styles/Styles';
import { accentColorTypeKeys, getAccentSet, useAccentColor } from '~/lib/useAccentColor';
import AccentColorButton from '~/components/AccentColorButton';

// --- Component to manage the counter using zustand ---
const CounterControls = () => {
  const { colors, isDarkColorScheme } = useColorScheme();
  const { accentColor } = useAccentColor();
  const accentSet = getAccentSet(accentColor);
  const userId = useUserStore((state) => state.userId);
  const increment = useUserStore((state) => state.increment);
  const decrement = useUserStore((state) => state.decrement);

  return (
    <View style={[styles.section, cardStyle(isDarkColorScheme, colors, accentSet)]}>
      <Text style={[styles.header, textColor(isDarkColorScheme)]}>Manage User ID</Text>
      <Text style={[styles.counter, textColor(isDarkColorScheme)]}>Current User ID: {userId}</Text>
      <View style={styles.buttonContainer}>
        <Button
          className="h-12"
          style={Style.formButton(isDarkColorScheme, accentSet)}
          onPress={decrement}>
          <Text style={Style.formButtonText(isDarkColorScheme, accentSet)}>Decrement</Text>
        </Button>
        <View style={styles.buttonSpacer} />
        <Button
          className="h-12"
          style={Style.formButton(isDarkColorScheme, accentSet)}
          onPress={increment}>
          <Text style={Style.formButtonText(isDarkColorScheme, accentSet)}>Increment</Text>
        </Button>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {accentColorTypeKeys.map((colorKey) => (
            <AccentColorButton key={colorKey} color={colorKey} />
          ))}
        </View>
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
