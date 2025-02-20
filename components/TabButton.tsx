import React from 'react';
import { GestureResponderEvent, Platform, Pressable, View } from 'react-native';
import { useWebRipple } from '~/lib/useWebRipple';
import { cn } from '../lib/cn';
import { useColorScheme } from '~/lib/useColorScheme';

type TabButtonProps = {
  children: React.ReactNode;
  active?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  style?: any;
};

export function TabButton({ children, active, onPress, style }: TabButtonProps) {
  const { isDarkColorScheme } = useColorScheme();
  const webRippleProps = useWebRipple({
    // color: isDarkColorScheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
    // duration: 500,
  });

  return (
    <Pressable
      onPress={onPress}
      style={style}
      className={cn(
        'web:web-ripple flex-1 flex-row items-center justify-center py-1',
        active && 'bg-primary/10'
      )}
      {...(Platform.OS === 'web' ? webRippleProps : {})}>
      <View className="items-center">{children}</View>
    </Pressable>
  );
}
