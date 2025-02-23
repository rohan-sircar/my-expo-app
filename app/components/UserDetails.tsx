import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ApiUser, fetchUser, useUserStore } from '../stores/UserStore';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { cardStyle, subCardStyle } from '../styles/Styles';
import { useColorScheme } from '~/lib/useColorScheme';
import { getAccentSet, useAccentColor } from '~/lib/useAccentColor';

// Component that displays user details fetched via TanStack Query.
const UserDetails = () => {
  const { colors, isDarkColorScheme } = useColorScheme();
  const { accentColor } = useAccentColor();
  const accentSet = getAccentSet(accentColor);
  // Access the userId from our zustand‑x store.
  const userId = useUserStore((state) => state.userId);

  // TanStack Query fetches user data based on the current userId.
  const { data, isLoading, isError, error } = useQuery<ApiUser, Error>({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  return (
    <View style={[cardStyle(isDarkColorScheme, colors, accentSet)]}>
      <Text
        className="tracking-moderate mb-4 text-2xl font-semibold"
        style={{ color: colors.text }}>
        User Details for ID: {userId}
      </Text>
      {isLoading && <ActivityIndicator size="large" color={colors.primary} />}
      {isError && (
        <Text className="mt-2.5 rounded-lg bg-red-50 p-3 text-center text-base text-red-600">
          {'Error fetching user data: ' + error?.message}
        </Text>
      )}
      {data && (
        <View style={subCardStyle(isDarkColorScheme, accentSet)}>
          <Text className="my-1 text-lg tracking-tight" style={{ color: colors.text }}>
            Name: {data.name}
          </Text>
          <Text className="my-1 text-lg tracking-tight" style={{ color: colors.text }}>
            Email: {data.email}
          </Text>
        </View>
      )}
    </View>
  );
};

export default UserDetails;
