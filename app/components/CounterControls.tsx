import React from 'react';
import { View } from 'react-native';
import { useUserStore } from '../stores/UserStore';
import { Text } from 'react-native';
import { cardStyle } from '../styles/Styles';
import { useColorScheme } from '~/lib/useColorScheme';
import { Button } from '~/components/nativewindui/Button';
import * as Style from '../styles/Styles';
import { accentColorTypeKeys, getAccentSet, useAccentColor } from '~/lib/useAccentColor';
import AccentColorButton from '~/components/AccentColorButton';
import FormButton from './FormButton';

// --- Component to manage the counter using zustand ---
const CounterControls = () => {
  const { colors, isDarkColorScheme } = useColorScheme();
  const { accentColor } = useAccentColor();
  const accentSet = getAccentSet(accentColor);
  const userId = useUserStore((state) => state.userId);
  const increment = useUserStore((state) => state.increment);
  const decrement = useUserStore((state) => state.decrement);

  return (
    <View className="my-4 p-4" style={cardStyle(isDarkColorScheme, colors, accentSet)}>
      <Text className="mb-4 text-2xl font-semibold tracking-wider" style={{ color: colors.text }}>
        Manage User ID
      </Text>
      <Text className="mb-3 text-center text-base" style={{ color: colors.text }}>
        Current User ID: {userId}
      </Text>
      <View className="flex-col gap-4">
        <FormButton buttonText="Decrement" onPress={decrement}></FormButton>
        <FormButton buttonText="Increment" onPress={increment}></FormButton>
        <View className="flex-row justify-between">
          {accentColorTypeKeys.map((colorKey) => (
            <AccentColorButton key={colorKey} color={colorKey} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default CounterControls;
