import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeToggle from '~/components/ThemeToggle';
import { useAccentColor } from '~/lib/useAccentColor';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { useResponsiveLayout } from '~/lib/useResponsiveLayout';
import { NAV_THEME } from '~/theme';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { LogoutButton } from '~/components/LogoutButton';
import { BaseAccentGradients, SystemColors } from '~/theme/colors';
import { NAVIGATION_CONFIG } from '~/types/navigation';
import AuthStack from './components/AuthStack';
import DrawerContent from './components/DrawerContent';
import HomeTabs from './components/HomeTabs';
import { SettingsIcon } from './components/SettingsIcon';
import ControlsScreen from './screens/ControlsScreen';
import { useUserStore } from './stores/UserStore';

const Drawer = createDrawerNavigator();

const SCREEN_OPTIONS = {
  animation: 'ios_from_right',
} as const;

export default function RootLayout() {
  // useRouteTitle();
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme, colors } = useColorScheme();
  const queryClient = new QueryClient();
  const { loggedIn } = useUserStore();
  const { accentColor } = useAccentColor();
  const { isDesktop } = useResponsiveLayout();

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ActionSheetProvider>
            <NavThemeProvider value={NAV_THEME[colorScheme]}>
              <QueryClientProvider client={queryClient}>
                <LinearGradient
                  colors={[
                    BaseAccentGradients[accentColor].gradientStart,
                    BaseAccentGradients[accentColor].gradientEnd,
                  ]}
                  style={{ flex: 1 }}>
                  <SafeAreaView className="flex-1">
                    <View className="mx-auto w-full max-w-[800px] flex-1">
                      <Drawer.Navigator
                        drawerContent={(props) => <DrawerContent {...props} />}
                        screenOptions={({ navigation }) => ({
                          headerRight: () => (
                            <View className="flex flex-row items-center gap-3 pr-2">
                              <ThemeToggle />
                              {loggedIn && <SettingsIcon />}
                              {loggedIn && <LogoutButton />}
                            </View>
                          ),
                          ...(isDesktop
                            ? desktopDrawerProperties(colors)
                            : mobileDrawerProperties(colors, navigation)),
                        })}>
                        <Drawer.Screen
                          name={NAVIGATION_CONFIG.Home.name}
                          component={HomeTabs}
                          options={{
                            title: NAVIGATION_CONFIG.Home.title,
                          }}
                        />
                        <Drawer.Screen
                          name={NAVIGATION_CONFIG.Account.name}
                          component={AuthStack}
                          options={{
                            title: NAVIGATION_CONFIG.Account.title,
                          }}
                        />
                        <Drawer.Screen
                          name={NAVIGATION_CONFIG.Settings.name}
                          component={ControlsScreen}
                          options={{
                            title: NAVIGATION_CONFIG.Settings.title,
                            headerShown: isDesktop ? false : true,
                          }}
                        />
                      </Drawer.Navigator>
                    </View>
                  </SafeAreaView>
                </LinearGradient>
              </QueryClientProvider>
            </NavThemeProvider>
          </ActionSheetProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}

const desktopDrawerProperties = (colors: SystemColors): DrawerNavigationOptions => ({
  drawerType: 'permanent',
  drawerStyle: {
    width: 240,
    backgroundColor: colors.background,
  },
});

const mobileDrawerProperties = (
  colors: SystemColors,
  navigation?: DrawerNavigationProp<any>
): DrawerNavigationOptions => ({
  headerTitle: '',
  headerLeft: () => (
    <Pressable onPress={() => navigation?.toggleDrawer()} className="ml-4">
      <FontAwesome name="bars" size={24} color={colors.text} />
    </Pressable>
  ),
  drawerType: 'front',
  drawerStyle: {
    backgroundColor: colors.background,
    width: '80%',
  },
  ...SCREEN_OPTIONS,
});
