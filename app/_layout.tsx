import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
import { getAccentSet, useAccentColor } from '~/lib/useAccentColor';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { useResponsiveLayout } from '~/lib/useResponsiveLayout';
import { NAV_THEME } from '~/theme';
import { RootStackParamList } from '~/types/navigation';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { LogoutButton } from '~/components/LogoutButton';
import { TabButton } from '~/components/TabButton';
import { BaseAccentGradients } from '~/theme/colors';
import DrawerContent from './components/DrawerContent';
import ControlsScreen from './screens/ControlsScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import { useUserStore } from './stores/UserStore';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

function HomeTabs() {
  const { userId, loggedIn } = useUserStore();
  const { colors, isDarkColorScheme } = useColorScheme();
  const { accentColor } = useAccentColor();
  const accentSet = getAccentSet(accentColor);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        tabBarActiveBackgroundColor: colors.grey4,
        tabBarStyle: {
          backgroundColor: colors.background,
        },
        tabBarButton: (props) => (
          <TabButton
            active={props.accessibilityState?.selected}
            onPress={props.onPress}
            style={[props.style]}>
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
              tabBarIcon: () => (
                <FontAwesome name="sign-in" style={{ fontSize: 24 }} color={colors.text} />
              ),
            }}
          />
          <Tab.Screen
            name="Register"
            component={RegisterScreen}
            options={{
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
  const { accentColor } = useAccentColor();
  const accentSet = getAccentSet(accentColor);
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
                  // colors={['#00008B', '#4169E1']} // Deep Blue gradient
                  // colors={[accentSet.gradientStart, accentSet.gradientEnd]}
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
                            headerShown: false,
                            drawerType: 'permanent',
                            drawerStyle: {
                              width: 240,
                              backgroundColor: colors.background,
                            },
                          }}>
                          <Drawer.Screen name="Main" component={HomeTabs} />
                          <Drawer.Screen name="Auth" component={AuthStack} />
                        </Drawer.Navigator>
                      ) : (
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
