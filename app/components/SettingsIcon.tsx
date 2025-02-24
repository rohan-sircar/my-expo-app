import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '@roninoss/icons';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import { useUserStore } from '../stores/UserStore';
import { RootStackParamList } from '~/types/navigation';

export const SettingsIcon = () => {
  const { userId } = useUserStore();
  const { colors } = useColorScheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      className="opacity-80"
      onPress={() => {
        if (userId) {
          navigation.navigate('Profile', { userId: userId.toString() });
        }
      }}>
      <View className="opacity-90">
        <Icon name="person-outline" color={colors.foreground} />
      </View>
    </Pressable>
  );
};

export default SettingsIcon;
