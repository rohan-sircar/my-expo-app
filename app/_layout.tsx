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
import { useAccentColor, getAccentSet } from '~/lib/useAccentColor';
import { NAV_THEME } from '~/theme';
import { RootStackParamList } from '~/types/navigation';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ControlsScreen from './screens/ControlsScreen';
import { useUserStore } from './stores/UserStore';
import { LogoutButton } from '~/components/LogoutButton';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Style from './styles/Styles';
import { TabButton } from '~/components/TabButton';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  const { userId, loggedIn } = useUserStore();
  const { colors, isDarkColorScheme } = useColorScheme();
  const { accentColor } = useAccentColor();
  const accentSet = getAccentSet(accentColor);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        tabBarActiveBackgroundColor: accentSet.bgNavTab,
        tabBarStyle: {
          backgroundColor: colors.background,
        },
        tabBarButton: (props) => (
          <TabButton
            active={props.accessibilityState?.selected}
            onPress={props.onPress}
            style={props.style}>
            {props.children}
          </TabButton>
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <View className="flex flex-row items-center gap-3 pr-2">
              <ThemeToggle />
              {loggedIn && <SettingsIcon />}
              {loggedIn && <LogoutButton />}
            </View>
          ),
          tabBarIcon: () => <Icon name="home" color={colors.text} />,
        }}
      />
      {loggedIn ? (
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
            headerRight: () => <ThemeToggle />,
            tabBarIcon: () => <Icon name="person" color={colors.text} />,
          }}
          initialParams={{ userId: userId }}
        />
      ) : (
        <Tab.Group>
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerRight: () => <ThemeToggle />,
              tabBarIcon: () => (
                <FontAwesome name="sign-in" style={{ fontSize: 24 }} color={colors.text} />
              ),
            }}
          />
          <Tab.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerRight: () => <ThemeToggle />,
              tabBarIcon: () => (
                <FontAwesome name="check-circle" style={{ fontSize: 24 }} color={colors.text} />
              ),
            }}
          />
        </Tab.Group>
      )}

      <Tab.Screen
        name="Controls"
        component={ControlsScreen}
        options={{
          headerRight: () => <ThemeToggle />,
          tabBarIcon: () => <Icon name="cog" color={colors.text} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme, colors } = useColorScheme();
  const queryClient = new QueryClient();
  const { userId, loggedIn } = useUserStore();

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
                          ...SCREEN_OPTIONS,
                          ...INDEX_OPTIONS,
                          headerRight: () => (
                            <View className="flex flex-row items-center gap-3 pr-2">
                              <ThemeToggle />
                              {loggedIn && <SettingsIcon />}
                              {loggedIn && <LogoutButton />}
                            </View>
                          ),
                        }}
                        component={HomeTabs}
                      />
                    </Stack.Navigator>
                  </View>
                </SafeAreaView>
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
  const { userId } = useUserStore();
  const { colors } = useColorScheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      className="opacity-80"
      onPress={() => {
        if (userId) {
          navigation.navigate('Profile', { userId });
        }
      }}>
      <View className="opacity-90">
        <Icon name="person-outline" color={colors.foreground} />
      </View>
    </Pressable>
  );
};
