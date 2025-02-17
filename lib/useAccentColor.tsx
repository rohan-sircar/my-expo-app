import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccentColors, AccentColorSet } from '~/theme/colors';

interface AccentColorHook {
  accentColor: keyof typeof AccentColors;
  accentSet: AccentColorSet;
  setAccentColor: (color: keyof typeof AccentColors) => void;
}

const ACCENT_KEY = 'userAccentColor';

function useAccentColor(): AccentColorHook {
  const [accentColor, setAccentColor] = useState<keyof typeof AccentColors>('blue');

  useEffect(() => {
    const loadAccentColor = async () => {
      try {
        const storedColor = await AsyncStorage.getItem(ACCENT_KEY);
        if (storedColor && Object.keys(AccentColors).includes(storedColor)) {
          setAccentColor(storedColor as keyof typeof AccentColors);
        }
      } catch (error) {
        console.error('Error loading accent color:', error);
      }
    };

    loadAccentColor();
  }, []);

  const saveAccentColor = async (color: keyof typeof AccentColors) => {
    try {
      await AsyncStorage.setItem(ACCENT_KEY, color);
      setAccentColor(color);
    } catch (error) {
      console.error('Error saving accent color:', error);
    }
  };

  return {
    accentColor,
    accentSet: AccentColors[accentColor],
    setAccentColor: saveAccentColor,
  };
}

export { useAccentColor };
