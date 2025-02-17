import * as NavigationBar from 'expo-navigation-bar';
import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { AccentColorSet, COLORS, AccentColors } from '~/theme/colors';
import { useAccentColor } from './useAccentColor';

interface ColorSchemeHook {
  colorScheme: 'light' | 'dark';
  isDarkColorScheme: boolean;
  setColorScheme: (colorScheme: 'light' | 'dark') => void;
  toggleColorScheme: () => void;
  colors: any;
  accentSet: AccentColorSet;
  setAccentColor: (color: keyof typeof AccentColors) => void;
}

function useColorScheme(): ColorSchemeHook {
  const { colorScheme: nativeWindColorScheme, setColorScheme: setNativeWindColorScheme } =
    useNativewindColorScheme();
  const { accentColor, accentSet, setAccentColor } = useAccentColor();

  const colorScheme = nativeWindColorScheme ?? 'light';

  useEffect(() => {
    if (Platform.OS === 'android') {
      setNavigationBar(colorScheme);
    }
  }, [colorScheme]);

  const setColorScheme = (colorScheme: 'light' | 'dark') => {
    setNativeWindColorScheme(colorScheme);
    if (Platform.OS === 'android') {
      setNavigationBar(colorScheme);
    }
  };

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };

  const colors = {
    ...COLORS[colorScheme],
    accent: accentSet,
  };

  return {
    colorScheme,
    isDarkColorScheme: colorScheme === 'dark',
    setColorScheme,
    toggleColorScheme,
    colors,
    accentSet,
    setAccentColor,
  };
}

function setNavigationBar(colorScheme: 'light' | 'dark') {
  return Promise.all([
    NavigationBar.setButtonStyleAsync(colorScheme === 'dark' ? 'light' : 'dark'),
    NavigationBar.setPositionAsync('absolute'),
    NavigationBar.setBackgroundColorAsync(colorScheme === 'dark' ? '#00000030' : '#ffffff80'),
  ]);
}

function useInitialAndroidBarSync() {
  const { colorScheme } = useColorScheme();
  useEffect(() => {
    if (Platform.OS === 'android') {
      setNavigationBar(colorScheme).catch((error) => {
        console.error('useColorScheme.tsx", "useInitialColorScheme', error);
      });
    }
  }, [colorScheme]);
}

export { useColorScheme, useInitialAndroidBarSync };
