import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button } from '~/components/nativewindui/Button';
import { useColorScheme } from '~/lib/useColorScheme';
import React from 'react';
import { StyleSheet } from 'react-native';
import * as Style from '../styles/Styles';

const LoginScreen = () => {
  const { colors, isDarkColorScheme } = useColorScheme();

  return (
    <View className={`flex-1 items-center justify-center px-4`}>
      <View
        className={`w-full max-w-[380px] rounded-xl p-6 shadow-lg ${Style.getCardBackground(isDarkColorScheme)}`}>
        <View>
          <Text
            className={`mb-6 text-center text-xl font-semibold ${Style.getHeadingTextColor(isDarkColorScheme)}`}>
            Sign in to your account
          </Text>
        </View>

        <View className="mb-6 gap-4">
          <TextInput
            placeholder="Email"
            className={Style.getInputStyles(isDarkColorScheme)}
            placeholderTextColor={Style.getPlaceholderColor(isDarkColorScheme)}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            className={Style.getInputStyles(isDarkColorScheme)}
            placeholderTextColor={Style.getPlaceholderColor(isDarkColorScheme)}
          />
        </View>

        <View>
          <Button style={styles.blueButton}>
            <Text style={styles.buttonText}>Sign In</Text>
          </Button>
          <TouchableOpacity>
            <Text
              className={`mt-4 text-center text-sm ${Style.getSecondaryTextColor(isDarkColorScheme)}`}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <View className="relative my-6">
          <View className="absolute inset-0 flex items-center justify-center">
            <View className={`h-[1px] w-full ${Style.getDividerColor(isDarkColorScheme)}`} />
          </View>
          <View className="relative flex flex-row justify-center">
            <Text
              className={`bg-inherit px-4 text-sm ${Style.getSecondaryTextColor(isDarkColorScheme)} ${Style.getCardBackground(isDarkColorScheme)}`}>
              or continue with
            </Text>
          </View>
        </View>

        <View className="gap-4">
          <Button className={Style.getSocialButtonStyles(isDarkColorScheme)}>
            <Text
              className={`text-base font-medium ${Style.getHeadingTextColor(isDarkColorScheme)}`}>
              Sign in with Google
            </Text>
          </Button>
          <Button className="h-12 w-full flex-row items-center justify-center rounded-lg bg-zinc-900">
            <Text className="text-base font-medium text-white">Sign in with GitHub</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  blueButton: {
    backgroundColor: 'blue',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
