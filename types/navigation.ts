import { DrawerNavigationProp } from '@react-navigation/drawer';

export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: number };
  Login: undefined;
  Register: undefined;
  Controls: undefined;
  Auth: { screen: 'Login' | 'Register' };
};

export type DrawerParamList = {
  Main: {
    screen?: 'Home' | 'Profile' | 'Controls';
    params?: {
      userId?: number;
    };
  };
  Auth: {
    screen?: 'Login' | 'Register';
  };
};

export type DrawerScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};
