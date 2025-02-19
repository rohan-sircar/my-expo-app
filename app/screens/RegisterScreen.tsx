import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button } from '~/components/nativewindui/Button';
import { useColorScheme } from '~/lib/useColorScheme';
import React from 'react';
import * as Style from '../styles/Styles';
import { getAccentSet, useAccentColor } from '~/lib/useAccentColor';

const RegisterScreen = () => {
  const { colors, isDarkColorScheme } = useColorScheme();
  const { accentColor } = useAccentColor();
  const accentSet = getAccentSet(accentColor);

  return (
    <View className="flex-1 items-center justify-center px-4">
      <View
        className={`w-full max-w-[380px] rounded-xl p-6 shadow-lg`}
        style={Style.cardStyle(isDarkColorScheme, colors, accentSet)}>
        <View>
          <Text
            className={`mb-6 text-center text-xl font-semibold ${
              isDarkColorScheme ? 'text-zinc-100' : 'text-zinc-800'
            }`}>
            Create a new account
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
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            className={`h-12 rounded-lg border px-4 text-base`}
            style={Style.inputStyle(isDarkColorScheme, accentSet)}
            placeholderTextColor={Style.getPlaceholderColor(isDarkColorScheme, accentSet)}
          />
        </View>

        <View>
          <Button className="h-12" style={Style.formButton(isDarkColorScheme, accentSet)}>
            <Text style={Style.formButtonText(isDarkColorScheme, accentSet)}>Register</Text>
          </Button>
        </View>

        <View className="relative my-6">
          <View className="absolute inset-0 flex items-center justify-center">
            <View
              className={`h-[1px] w-full ${isDarkColorScheme ? 'bg-zinc-700' : 'bg-gray-200'}`}
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
          <Button className={Style.getSocialButtonStyles(isDarkColorScheme, accentSet)}>
            <Text
              className={`text-base font-medium ${Style.getHeadingTextColor(isDarkColorScheme, accentSet)}`}>
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

export default RegisterScreen;
