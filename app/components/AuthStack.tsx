import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {
  AUTH_NAVIGATION_CONFIG,
  NAVIGATION_CONFIG,
  TabParamList,
  DrawerParamList,
  AuthStackParamList,
} from '~/types/navigation';
import { useNavigationState } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  const navigation = useNavigation();
  const state = useNavigationState((state) => state);

  // useLayoutEffect(() => {
  //   if (!state?.routes || !state.index) return;
  //   const currentRoute = state.routes[state.index];
  //   console.log(currentRoute);
  //   // const screenName = currentRoute.name.split('/')[1];
  //   const params = (currentRoute.params as { screen?: string }) || {};
  //   const screenName = params.screen;

  //   console.log(screenName);
  //   const title =
  //     screenName === 'SignIn'
  //       ? AUTH_NAVIGATION_CONFIG.SignIn.title
  //       : AUTH_NAVIGATION_CONFIG.Register.title;
  //   document.title = title;
  // }, [state?.routes, state?.index, navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: NAVIGATION_CONFIG.Account.title,
        // headerLargeTitle: true,
        headerShown: false,
      }}>
      <Stack.Screen
        name="SignIn"
        component={LoginScreen}
        options={{
          headerTitle: 'Sign in',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerTitle: 'Create Account',
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
