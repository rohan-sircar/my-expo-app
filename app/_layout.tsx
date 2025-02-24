import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeToggle from '~/components/ThemeToggle';
import { getAccentSet, useAccentColor } from '~/lib/useAccentColor';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { useResponsiveLayout } from '~/lib/useResponsiveLayout';
import { NAV_THEME } from '~/theme';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { LogoutButton } from '~/components/LogoutButton';
import { BaseAccentGradients } from '~/theme/colors';
import AuthStack from './components/AuthStack';
import DrawerContent from './components/DrawerContent';
import HomeTabs from './components/HomeTabs';
import { SettingsIcon } from './components/SettingsIcon';
import { useUserStore } from './stores/UserStore';
import { NAVIGATION_CONFIG } from '~/types/navigation';

const Drawer = createDrawerNavigator();

const SCREEN_OPTIONS = {
  animation: 'ios_from_right',
} as const;

export default function RootLayout() {
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
                      {isDesktop ? (
                        <Drawer.Navigator
                          drawerContent={(props) => <DrawerContent {...props} />}
                          screenOptions={{
                            headerLeft: () => null, // Hide hamburger menu in desktop
                            headerRight: () => (
                              <View className="flex flex-row items-center gap-3 pr-2">
                                <ThemeToggle />
                                {loggedIn && <SettingsIcon />}
                                {loggedIn && <LogoutButton />}
                              </View>
                            ),
                            drawerType: 'permanent',
                            drawerStyle: {
                              width: 240,
                              backgroundColor: colors.background,
                            },
                          }}>
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
                        </Drawer.Navigator>
                      ) : (
                        <Drawer.Navigator
                          drawerContent={(props) => <DrawerContent {...props} />}
                          screenOptions={({ navigation }) => ({
                            headerTitle: '',
                            headerLeft: () => (
                              <Pressable onPress={() => navigation.toggleDrawer()} className="ml-4">
                                <FontAwesome name="bars" size={24} color={colors.text} />
                              </Pressable>
                            ),
                            headerRight: () => (
                              <View className="flex flex-row items-center gap-3 pr-2">
                                <ThemeToggle />
                                {loggedIn && <SettingsIcon />}
                                {loggedIn && <LogoutButton />}
                              </View>
                            ),
                            drawerType: 'front',
                            drawerStyle: {
                              backgroundColor: colors.background,
                              width: 240,
                            },
                            ...SCREEN_OPTIONS,
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
                        </Drawer.Navigator>
                      )}
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
