import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '@roninoss/icons';
import 'expo-dev-client';
import { Stack, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

import ThemeToggle from '~/components/ThemeToggle';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';
import { RootStackParamList } from '~/types/navigation';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme, colors } = useColorScheme();

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
              <SafeAreaView className="flex-1">
                <View className="mx-auto w-full max-w-[800px] flex-1">
                  <Stack
                    screenOptions={{
                      ...SCREEN_OPTIONS,
                      headerStyle: {
                        backgroundColor: colors.background,
                      },
                      headerTintColor: colors.foreground,
                    }}>
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
                    />
                    <Stack.Screen
                      name="profile"
                      options={{
                        title: 'Profile',
                        headerRight: () => <ThemeToggle />,
                      }}
                    />
                  </Stack>
                </View>
              </SafeAreaView>
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
  title: 'Home',
} as const;

const SettingsIcon: React.FC = () => {
  const { colors } = useColorScheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      className="opacity-80"
      onPressOut={() => navigation.navigate('profile', { userId: 0 })}>
      <View className="opacity-90">
        <Icon name="person-outline" color={colors.foreground} />
      </View>
    </Pressable>
  );
};
