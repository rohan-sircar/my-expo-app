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
