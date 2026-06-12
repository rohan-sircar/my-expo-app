import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button } from '~/components/nativewindui/Button';
import * as WebBrowser from 'expo-web-browser';
import { useAuthStore } from '~/app/stores/AuthStore';
import * as Style from '../styles/Styles';
import { useColorScheme } from '~/lib/useColorScheme';
import { useAccentColor, getAccentSet } from '~/lib/useAccentColor';
import { Ionicons } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.x:7800';
const SCHEME = 'my-expo-app';

const GoogleButton = () => {
  const setCredentials = useAuthStore((s) => s.setCredentials);
  const [loading, setLoading] = useState(false);
  const { colors, isDarkColorScheme } = useColorScheme();
  const { accentColor } = useAccentColor();
  const accentSet = getAccentSet(accentColor);

  const handlePress = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const authorizeUrl = `${API_BASE}/api/v1/auth/oauth/google/login`;
      const redirectUrl = `${SCHEME}://oauth/google/callback`;

      const result = await WebBrowser.openAuthSessionAsync(authorizeUrl, redirectUrl);

      if (result.type === 'success' && result.url) {
        const url = new URL(result.url);
        const code = url.searchParams.get('code');

        if (code) {
          const exchangeResponse = await fetch(`${API_BASE}/api/v1/auth/oauth/google/exchange`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
          });

          if (!exchangeResponse.ok) {
            Alert.alert('Error', 'Google authentication failed');
            return;
          }

          const data = await exchangeResponse.json();
          setCredentials(data.token, data.user);
        }
      }
    } catch (err) {
      Alert.alert('Error', 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className={Style.getSocialButtonClasses(isDarkColorScheme, accentSet)}
      hoverColor={colors.grey6}
      defaultColor={colors.card}
      onPress={handlePress}
      disabled={loading}>
      <View className="flex-row items-center gap-3">
        <Ionicons name="logo-google" size={20} color="#4285F4" />
        <Text
          className={`text-base font-medium ${Style.getHeadingTextColor(
            isDarkColorScheme,
            accentSet
          )}`}>
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </Text>
      </View>
    </Button>
  );
};

export default GoogleButton;
