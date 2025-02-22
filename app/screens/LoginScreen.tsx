import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button } from '~/components/nativewindui/Button';
import { useColorScheme } from '~/lib/useColorScheme';
import React from 'react';
import { StyleSheet } from 'react-native';
import * as Style from '../styles/Styles';
import { useUserStore } from '../stores/UserStore';
import { getAccentSet, useAccentColor } from '~/lib/useAccentColor';
import GithubButton from '../components/GithubButton';
import GoogleButton from '../components/GoogleButton';
import FormButton from '../components/FormButton';

const LoginScreen = () => {
  const { colors, isDarkColorScheme } = useColorScheme();
  const { accentColor } = useAccentColor();
  const accentSet = getAccentSet(accentColor);

  return (
    <View className={`flex-1 items-center justify-center px-4`}>
      <View
        className={`w-full max-w-[380px] rounded-xl p-6 shadow-lg`}
        style={Style.cardStyle(isDarkColorScheme, colors, accentSet)}>
        <View>
          <Text
            className={`mb-6 text-center text-xl font-semibold ${Style.getHeadingTextColor(isDarkColorScheme, accentSet)}`}>
            Sign in to your account
          </Text>
        </View>

        <View className="mb-6 gap-4">
          <TextInput
            placeholder="Email"
            className={`h-12 rounded-lg border px-4 text-base`}
            style={Style.inputStyle(isDarkColorScheme, accentSet)}
            placeholderTextColor={Style.getPlaceholderColor(isDarkColorScheme, accentSet)}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            className={`h-12 rounded-lg border px-4 text-base`}
            style={Style.inputStyle(isDarkColorScheme, accentSet)}
            placeholderTextColor={Style.getPlaceholderColor(isDarkColorScheme, accentSet)}
          />
        </View>

        <View>
          <FormButton
            buttonText="Submit"
            onPress={() => useUserStore.setState({ loggedIn: true })}></FormButton>
          <TouchableOpacity>
            <Text
              className={`mt-4 text-center text-sm ${Style.getSecondaryTextColor(isDarkColorScheme, accentSet)}`}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <View className="relative my-6">
          <View className="absolute inset-0 flex items-center justify-center">
            <View
              className={`h-[1px] w-full ${Style.getDividerColor(isDarkColorScheme, accentSet)}`}
            />
          </View>
          <View className="relative flex flex-row justify-center">
            <Text
              className={`bg-inherit px-4 text-sm`}
              style={{ backgroundColor: colors.card, color: colors.foreground }}>
              or continue with
            </Text>
          </View>
        </View>
        <View className="gap-4">
          <GoogleButton></GoogleButton>
          <GithubButton></GithubButton>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
