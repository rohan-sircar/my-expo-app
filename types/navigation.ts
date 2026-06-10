import { NavigatorScreenParams } from '@react-navigation/native';

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

// Navigation helper that handles both navigation and title updates
export function navigateWithTitle(navigate: () => void, title?: string) {
  document.title = title ? `My Web App | ${title}` : 'My App';
  navigate();
}
