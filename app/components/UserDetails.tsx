import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ApiUser, fetchUser, useUserStore } from '../stores/UserStore';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { cardStyle, subCardStyle, textColor } from '../styles/Styles';
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
    <View style={[styles.section, cardStyle(isDarkColorScheme, colors, accentSet)]}>
      <Text style={[styles.header, textColor(isDarkColorScheme)]}>
        User Details for ID: {userId}
      </Text>
      {isLoading && <ActivityIndicator size="large" color={colors.primary} />}
      {isError && (
        <Text style={styles.errorText}>{'Error fetching user data: ' + error?.message}</Text>
      )}
      {data && (
        <View style={subCardStyle(isDarkColorScheme, accentSet)}>
          <Text style={[styles.userText, textColor(isDarkColorScheme)]}>Name: {data.name}</Text>
          <Text style={[styles.userText, textColor(isDarkColorScheme)]}>Email: {data.email}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f5fcff',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginVertical: 15,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  counter: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userText: {
    fontSize: 17,
    marginVertical: 4,
    letterSpacing: 0.3,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    padding: 12,
    backgroundColor: '#fef2f2',
    borderRadius: 8,
  },
});

export default UserDetails;
