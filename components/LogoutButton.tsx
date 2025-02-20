import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable } from 'react-native';
import { useColorScheme } from '../lib/useColorScheme';
import { useUserStore } from '~/app/stores/UserStore';

export function LogoutButton() {
  const { colors, isDarkColorScheme } = useColorScheme();

  return (
    <Pressable
      onPress={() => useUserStore.setState({ loggedIn: false })}
      style={{ marginRight: 15 }}>
      {({ pressed }) => (
        <FontAwesome
          name="sign-out"
          size={24}
          style={[
            {
              opacity: pressed ? 0.5 : 1,
              color: colors.text,
            },
          ]}
        />
      )}
    </Pressable>
  );
}
