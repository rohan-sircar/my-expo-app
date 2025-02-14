import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ApiUser, fetchUser, useUserStore } from '../stores/UserStore';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';

// Component that displays user details fetched via TanStack Query.
const UserDetails = () => {
  // Access the userId from our zustand‑x store.
  const userId = useUserStore((state) => state.userId);

  // TanStack Query fetches user data based on the current userId.
  const { data, isLoading, isError, error } = useQuery<ApiUser, Error>({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  return (
    <View style={styles.section}>
      <Text style={styles.header}>User Details for ID: {userId}</Text>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {isError && (
        <Text style={styles.errorText}>{'Error fetching user data: ' + error?.message}</Text>
      )}
      {data && (
        <View style={styles.userCard}>
          <Text style={styles.userText}>Name: {data.name}</Text>
          <Text style={styles.userText}>Email: {data.email}</Text>
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
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
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
  userCard: {
    marginTop: 10,
    backgroundColor: '#e8f4fd',
    padding: 10,
    borderRadius: 8,
  },
  userText: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
  },
});

export default UserDetails;
