import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import { Button } from '~/components/nativewindui/Button';
import * as WebBrowser from 'expo-web-browser';
import { useAuthStore } from '~/app/stores/AuthStore';
import { Ionicons } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.x:7800';
const SCHEME = 'my-expo-app';

const GithubButton = () => {
  const setCredentials = useAuthStore((s) => s.setCredentials);
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const authorizeUrl = `${API_BASE}/api/v1/auth/oauth/github/login`;
      const redirectUrl = `${SCHEME}://oauth/github/callback`;

      const result = await WebBrowser.openAuthSessionAsync(authorizeUrl, redirectUrl);

      if (result.type === 'success' && result.url) {
        const url = new URL(result.url);
        const code = url.searchParams.get('code');

        if (code) {
          const exchangeResponse = await fetch(`${API_BASE}/api/v1/auth/oauth/github/exchange`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
          });

          if (!exchangeResponse.ok) {
            Alert.alert('Error', 'GitHub authentication failed');
            return;
          }

          const data = await exchangeResponse.json();
          setCredentials(data.token, data.user);
        }
      }
    } catch (err) {
      Alert.alert('Error', 'GitHub login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="h-12 w-full flex-row items-center justify-center gap-3 rounded-lg"
      hoverColor="rgb(48, 48, 43)"
      defaultColor="rgb(40, 41, 35)"
      onPress={handlePress}
      disabled={loading}>
      <Ionicons name="logo-github" size={20} color="#fff" />
      <Text className="text-base font-medium text-white">
        {loading ? 'Signing in...' : 'Sign in with GitHub'}
      </Text>
    </Button>
  );
};

export default GithubButton;
