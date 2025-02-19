import React from 'react';
import { Pressable, View } from 'react-native';
import { useAccentColor } from '~/lib/useAccentColor';
import { BaseAccentColors } from '~/theme/colors';
import { AccentColorType } from '~/lib/useAccentColor';

interface AccentColorButtonProps {
  color: AccentColorType;
}

const AccentColorButton: React.FC<AccentColorButtonProps> = ({ color }) => {
  const { setAccentColor } = useAccentColor();

  return (
    <Pressable
      onPress={() => setAccentColor(color)}
      className="p-2 opacity-80"
      hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
      android_ripple={{ borderless: true }}>
      <View
        className="rounded-full"
        style={{ width: 30, height: 30, backgroundColor: BaseAccentColors[color] }}></View>
    </Pressable>
  );
};

export default AccentColorButton;
