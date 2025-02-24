import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { Icon } from '@roninoss/icons';
import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';
import { LogoutButton } from '~/components/LogoutButton';
import { TabButton } from '~/components/TabButton';
import { useColorScheme } from '~/lib/useColorScheme';
import ControlsScreen from '../screens/ControlsScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { useUserStore } from '../stores/UserStore';
import { NAVIGATION_CONFIG, TabParamList, TAB_ROUTE_TITLES } from '~/types/navigation';
import { SettingsIcon } from './SettingsIcon';

const Tab = createBottomTabNavigator<TabParamList>();

export const HomeTabs = () => {
  const { userId, loggedIn } = useUserStore();
  const { colors } = useColorScheme();
  const navigation = useNavigation();
  const state = useNavigationState((state) => state);

  // Update drawer title based on current tab
  useLayoutEffect(() => {
    if (!state?.routes || !state.index) return;
    const currentRoute = state.routes[state.index];
    const title =
      TAB_ROUTE_TITLES[currentRoute.name as keyof TabParamList] || TAB_ROUTE_TITLES.Home;
    navigation.setOptions({ title });
  }, [state?.index, navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
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
          tabBarIcon: () => (
            <Icon name={NAVIGATION_CONFIG.Home.icon || 'home'} color={colors.text} />
          ),
          title: TAB_ROUTE_TITLES.Home,
        }}
      />

      {loggedIn ? (
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: TAB_ROUTE_TITLES.Profile,
            tabBarIcon: () => <Icon name="person" color={colors.text} />,
          }}
          initialParams={{ userId: userId?.toString() }}
        />
      ) : (
        <Tab.Group>
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: TAB_ROUTE_TITLES.Login,
              tabBarIcon: () => (
                <FontAwesome name="sign-in" style={{ fontSize: 24 }} color={colors.text} />
              ),
            }}
          />
          <Tab.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: TAB_ROUTE_TITLES.Register,
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
          title: TAB_ROUTE_TITLES.Controls,
          //   headerShown: true,
          tabBarIcon: () => (
            <Icon name={NAVIGATION_CONFIG.Settings.icon || 'cog'} color={colors.text} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
