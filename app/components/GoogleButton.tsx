import React from 'react';
import { Button } from '~/components/nativewindui/Button';
import { View, Text } from 'react-native';
import * as Style from '../styles/Styles';
import { useColorScheme } from '~/lib/useColorScheme';
import { useAccentColor, getAccentSet } from '~/lib/useAccentColor';

export type GoogleButtonProps = {
  onPress?: () => void;
};

const GoogleButton = (props: GoogleButtonProps) => {
  const { colors, isDarkColorScheme } = useColorScheme();
  const { accentColor } = useAccentColor();
  const accentSet = getAccentSet(accentColor);
  return (
    <View className="gap-4">
      <Button
        className={Style.getSocialButtonClasses(isDarkColorScheme, accentSet)}
        hoverColor={colors.grey6}
        defaultColor={colors.card}
        onPress={props.onPress}>
        <Text
          className={`text-base font-medium ${Style.getHeadingTextColor(isDarkColorScheme, accentSet)}`}>
          Sign in with Google
        </Text>
      </Button>
    </View>
  );
};

export default GoogleButton;
