import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider as NavThemeProvider, useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Icon } from '@roninoss/icons';
import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeToggle from '~/components/ThemeToggle';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';
import { RootStackParamList } from '~/types/navigation';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ControlsScreen from './screens/ControlsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Tab.Screen
        name="Controls"
        component={ControlsScreen}
        options={{
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerRight: () => <ThemeToggle />,
        }}
        initialParams={{ userId: 0 }}
      />
    </Tab.Navigator>
  );
}

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme, colors } = useColorScheme();
  const queryClient = new QueryClient();

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
                <SafeAreaView className="flex-1">
                  <View className="mx-auto w-full max-w-[800px] flex-1">
                    <Stack.Navigator>
                      <Stack.Screen
                        name="index"
                        options={{
                          ...INDEX_OPTIONS,
                          headerRight: () => (
                            <View className="pr-2">
                              <SettingsIcon />
                            </View>
                          ),
                        }}
                        component={HomeTabs}
                      />
                      {/* <Stack.Screen
                        name="login"
                        component={LoginScreen}
                        options={{
                          title: 'Login',
                          headerRight: () => <ThemeToggle />,
                        }}
                      />
                      <Stack.Screen
                        name="register"
                        component={RegisterScreen}
                        options={{
                          title: 'Register',
                          headerRight: () => <ThemeToggle />,
                        }}
                      /> */}
                    </Stack.Navigator>
                    {/* screenOptions={{
                        ...SCREEN_OPTIONS,
                        headerStyle: {
                          backgroundColor: colors.background,
                        },
                        headerTintColor: colors.foreground,
                      }}> */}
                  </View>
                </SafeAreaView>
                {/* <SafeAreaView className="flex-1 pb-4">
                  <View className="mx-auto w-full max-w-[800px] flex-1">
                    <Tabs
                      screenOptions={({ route }) => ({
                        tabBarActiveTintColor: colors.primary,
                        tabBarInactiveTintColor: colors.foreground,
                        tabBarStyle: { borderTopWidth: 0 },
                        headerShown: route.name === '(tabs)',
                      })}>
                      <Tabs.Screen
                        name="(tabs)"
                        options={{
                          headerShown: false,
                        }}
                      />
                    </Tabs>
                  </View>
                </SafeAreaView> */}
              </QueryClientProvider>
            </NavThemeProvider>
          </ActionSheetProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}

const SCREEN_OPTIONS = {
  animation: 'ios_from_right',
} as const;

const INDEX_OPTIONS = {
  headerLargeTitle: true,
  headerShown: false,
} as const;

const SettingsIcon = () => {
  const { colors } = useColorScheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      className="opacity-80"
      onPressOut={() => navigation.navigate('Profile', { userId: 0 })}>
      <View className="opacity-90">
        <Icon name="person-outline" color={colors.foreground} />
      </View>
    </Pressable>
  );
};
