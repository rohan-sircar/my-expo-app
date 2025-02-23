import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from '~/lib/useColorScheme';
import { getAccentSet, useAccentColor } from '~/lib/useAccentColor';
import { useUserStore } from '../stores/UserStore';
import { Icon } from '@roninoss/icons';
import ThemeToggle from '~/components/ThemeToggle';
import React from 'react';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '~/types/navigation';
import { FontAwesome } from '@expo/vector-icons';
import MenuButton from './MenuButton';

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const { colors } = useColorScheme();
  const { accentColor } = useAccentColor();
  const accentSet = getAccentSet(accentColor);
  const { loggedIn } = useUserStore();
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const { userId } = useUserStore();

  const navigateTo = {
    home: () => navigation.navigate('Main', { screen: 'Home' }),
    profile: () => navigation.navigate('Main', { screen: 'Profile', params: { userId } }),
    auth: () => navigation.navigate('Auth', { screen: 'Login' }),
    controls: () => navigation.navigate('Main', { screen: 'Controls' }),
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
        borderRightWidth: 1,
        borderRightColor: colors.foreground,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 32,
        }}>
        <Text style={{ color: colors.foreground, fontSize: 24, fontWeight: 'bold' }}>Menu</Text>
        <ThemeToggle />
      </View>

      <MenuButton
        onPress={() => navigateTo.home()}
        icon={<Icon name="home" color={colors.foreground} size={14} />}
        label="Home"
      />

      {loggedIn ? (
        <MenuButton
          onPress={() => navigateTo.profile()}
          icon={<Icon name="person" color={colors.foreground} size={14} />}
          label="Profile"
        />
      ) : (
        <MenuButton
          onPress={() => navigateTo.auth()}
          icon={<FontAwesome name="sign-in" size={14} color={colors.foreground} />}
          label="Sign In"
        />
      )}

      <MenuButton
        onPress={navigateTo.controls}
        icon={<FontAwesome name="gear" size={14} color={colors.foreground} />}
        label="Controls"
      />
    </View>
  );
};

export default DrawerContent;
