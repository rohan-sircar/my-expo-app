import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthStackParamList, NAVIGATION_CONFIG } from '~/types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: NAVIGATION_CONFIG.Account.title,
        headerLargeTitle: true,
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
