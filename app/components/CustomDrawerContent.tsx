import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from '~/lib/useColorScheme';
import { SystemColors } from '~/theme/colors';
import { useAccentColor } from '~/lib/useAccentColor';
import { useUserStore } from '../stores/UserStore';
import { Icon } from '@roninoss/icons';
import ThemeToggle from '~/components/ThemeToggle';
import React from 'react';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList, RootStackParamList } from '~/types/navigation';
import { FontAwesome } from '@expo/vector-icons';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { colors } = useColorScheme();
  const { accentColor } = useAccentColor();
  const { loggedIn } = useUserStore();
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const { userId } = useUserStore();

  const navigateTo = {
    home: () => navigation.navigate('Main', { screen: 'Home' }),
    profile: () => navigation.navigate('Main', { screen: 'Profile', params: { userId } }),
    auth: () => navigation.navigate('Auth', { screen: 'Login' }),
    controls: () => navigation.navigate('Main', { screen: 'Controls' }),
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
        borderRightWidth: 1,
        borderRightColor: colors.foreground,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 32,
        }}>
        <Text style={{ color: colors.foreground, fontSize: 24, fontWeight: 'bold' }}>Menu</Text>
        <ThemeToggle />
      </View>

      <Pressable
        onPress={() => navigation.navigate('Main', { screen: 'Home' })}
        style={({ pressed }) => ({
          paddingVertical: 12,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          borderRadius: 8,
          backgroundColor: pressed ? colors.grey4 : 'transparent',
        })}>
        <Icon name="home" color={colors.foreground} />
        <Text style={{ color: colors.foreground }}>Home</Text>
      </Pressable>

      {loggedIn ? (
        <Pressable
          onPress={() =>
            navigation.navigate('Main', {
              screen: 'Profile',
              params: { userId },
            })
          }
          style={({ pressed }) => ({
            paddingVertical: 12,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            borderRadius: 8,
            backgroundColor: pressed ? colors.grey4 : 'transparent',
          })}>
          <Icon name="person" color={colors.foreground} />
          <Text style={{ color: colors.foreground }}>Profile</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() =>
            navigation.navigate('Auth', {
              screen: 'Login',
            })
          }
          style={({ pressed }) => ({
            paddingVertical: 12,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            borderRadius: 8,
            backgroundColor: pressed ? colors.grey4 : 'transparent',
          })}>
          <FontAwesome name="sign-in" color={accentColor} />
          <Text style={{ color: accentColor }}>Sign In</Text>
        </Pressable>
      )}

      <Pressable
        onPress={() => navigation.navigate('Main', { screen: 'Controls' })}
        style={({ pressed }) => ({
          paddingVertical: 12,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          borderRadius: 8,
          backgroundColor: pressed ? colors.grey4 : 'transparent',
        })}>
        <FontAwesome name="gear" color={colors.foreground} />
        <Text style={{ color: colors.foreground }}>Controls</Text>
      </Pressable>
    </View>
  );
}
