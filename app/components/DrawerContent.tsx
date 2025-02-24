import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useColorScheme } from '~/lib/useColorScheme';
import { getAccentSet, useAccentColor } from '~/lib/useAccentColor';
import { useUserStore } from '../stores/UserStore';
import { Icon } from '@roninoss/icons';
import ThemeToggle from '~/components/ThemeToggle';
import React, { useLayoutEffect } from 'react';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';
import MenuButton from './MenuButton';
import {
  NAVIGATION_CONFIG,
  TabParamList,
  TAB_ROUTE_TITLES,
  DrawerParamList,
} from '~/types/navigation';

interface NavigationActions {
  home: () => void;
  signIn: () => void;
  register: () => void;
  controls: () => void;
}

export const DrawerContent = (_props: DrawerContentComponentProps) => {
  const { colors } = useColorScheme();
  const { accentColor } = useAccentColor();
  const accentSet = getAccentSet(accentColor);
  const { loggedIn } = useUserStore();
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const { userId } = useUserStore();
  const state = useNavigationState((state) => state);

  // useLayoutEffect(() => {
  //   if (!state?.routes || !state.index) return;
  //   const currentRoute = state.routes[state.index];
  //   // console.log(currentRoute);
  //   if (currentRoute.name === NAVIGATION_CONFIG.Account.name) {
  //     // Don't set title for Account route as it will be handled by AuthStack
  //     return;
  //   }
  //   const config = NAVIGATION_CONFIG[currentRoute.name as keyof typeof NAVIGATION_CONFIG];
  //   // console.log(config?.title);
  //   document.title = config?.title || 'My App';
  // }, [state?.index, navigation]);

  const navigateTo: NavigationActions = {
    home: () => navigation.navigate(NAVIGATION_CONFIG.Home.name, { screen: 'Home' }),
    signIn: () =>
      navigation.navigate(NAVIGATION_CONFIG.Account.name, {
        screen: 'SignIn',
      }),
    register: () =>
      navigation.navigate(NAVIGATION_CONFIG.Account.name, {
        screen: 'Register',
      }),
    controls: () => navigation.navigate(NAVIGATION_CONFIG.Settings.name),
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
        onPress={navigateTo.home}
        icon={
          <Icon name={NAVIGATION_CONFIG.Home.icon || 'home'} color={colors.foreground} size={14} />
        }
        label={NAVIGATION_CONFIG.Home.title}
      />

      {!loggedIn && (
        <View>
          <MenuButton
            onPress={navigateTo.register}
            icon={<FontAwesome name="chevron-up" size={14} color={colors.foreground} />}
            label="Register"
          />
          <MenuButton
            onPress={navigateTo.signIn}
            icon={<FontAwesome name="sign-in" size={14} color={colors.foreground} />}
            label="Sign In"
          />
        </View>
      )}

      <MenuButton
        onPress={navigateTo.controls}
        icon={<FontAwesome name="gear" size={14} color={colors.foreground} />}
        label={NAVIGATION_CONFIG.Settings.title}
      />
    </View>
  );
};

export default DrawerContent;
