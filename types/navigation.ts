import { NavigatorScreenParams } from '@react-navigation/native';

export const NAVIGATION_CONFIG = {
  Home: {
    name: 'Home',
    title: 'Home',
    icon: 'home',
  },
  Account: {
    name: 'Account',
    title: 'Account',
    icon: 'person',
  },
  Settings: {
    name: 'Settings',
    title: 'Settings',
    icon: 'cog',
  },
} as const;

export type NavigationConfigKey = keyof typeof NAVIGATION_CONFIG;

export type NavigationConfig = {
  name: string;
  title: string;
  icon?: string;
};

// Route param types
export type TabParamList = {
  Home: undefined;
  Profile: { userId: string } | undefined;
  Controls: undefined;
  Login: undefined;
  Register: undefined;
};

export type AuthStackParamList = {
  SignIn: undefined;
  Register: undefined;
};

export type DrawerParamList = {
  [NAVIGATION_CONFIG.Home.name]: NavigatorScreenParams<TabParamList>;
  [NAVIGATION_CONFIG.Account.name]: NavigatorScreenParams<AuthStackParamList>;
  [NAVIGATION_CONFIG.Settings.name]: undefined;
};

export type RootStackParamList = {
  [key in NavigationConfigKey]: undefined;
} & {
  Profile: { userId: string };
};

// Type guard for checking if a navigation route belongs to DrawerParamList
export function isDrawerRoute(route: string): route is keyof DrawerParamList {
  return Object.values(NAVIGATION_CONFIG).some((config) => config.name === route);
}

// Helper to get screen title from navigation config
export function getScreenTitle(route: string): string {
  const config = Object.values(NAVIGATION_CONFIG).find((c) => c.name === route);
  return config?.title || route;
}

// Helper to get tab route title
export const TAB_ROUTE_TITLES: Record<keyof TabParamList, string> = {
  Home: NAVIGATION_CONFIG.Home.title,
  Profile: 'Profile',
  Controls: NAVIGATION_CONFIG.Settings.title,
  Login: 'Sign In',
  Register: 'Create Account',
};
