import { NavigatorScreenParams } from '@react-navigation/native';
import { Platform } from 'react-native';

// Route param types
export type TabParamList = {
  Feed: undefined;
  Profile: { userId: string } | undefined;
  // Controls: undefined;
  // Login: undefined;
  // Register: undefined;
};

export type AuthStackParamList = {
  SignIn: undefined;
  Register: undefined;
};

export type DrawerParamList = {
  Home: NavigatorScreenParams<TabParamList>;
  Account: NavigatorScreenParams<AuthStackParamList>;
  Settings: undefined;
};

// Navigation helper that handles both navigation and title updates (web only)
export function navigateWithTitle(navigate: () => void, title?: string) {
  if (Platform.OS === 'web') {
    document.title = title ? `My Web App | ${title}` : 'My App';
  }
  navigate();
}
