import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button } from '~/components/nativewindui/Button';
import { useColorScheme } from '~/lib/useColorScheme';
import React from 'react';
import { StyleSheet } from 'react-native';

const RegisterScreen = () => {
  const { colors, isDarkColorScheme } = useColorScheme();

  return (
    <View className="flex-1 items-center justify-center px-4">
      <View
        className={`w-full max-w-[380px] rounded-xl p-6 shadow-lg ${
          isDarkColorScheme ? 'bg-zinc-800' : 'bg-white'
        }`}>
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
            className={`h-12 rounded-lg border px-4 text-base ${
              isDarkColorScheme
                ? 'border-zinc-700 bg-zinc-800 text-zinc-100'
                : 'border-gray-200 bg-white text-zinc-800'
            }`}
            placeholderTextColor={isDarkColorScheme ? '#71717a' : '#9ca3af'}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            className={`h-12 rounded-lg border px-4 text-base ${
              isDarkColorScheme
                ? 'border-zinc-700 bg-zinc-800 text-zinc-100'
                : 'border-gray-200 bg-white text-zinc-800'
            }`}
            placeholderTextColor={isDarkColorScheme ? '#71717a' : '#9ca3af'}
          />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            className={`h-12 rounded-lg border px-4 text-base ${
              isDarkColorScheme
                ? 'border-zinc-700 bg-zinc-800 text-zinc-100'
                : 'border-gray-200 bg-white text-zinc-800'
            }`}
            placeholderTextColor={isDarkColorScheme ? '#71717a' : '#9ca3af'}
          />
        </View>

        <View>
          <Button style={styles.blueButton}>
            <Text style={styles.buttonText}>Register</Text>
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
              className={`bg-inherit px-4 text-sm ${
                isDarkColorScheme ? 'bg-zinc-800 text-zinc-400' : 'bg-white text-zinc-500'
              }`}>
              or continue with
            </Text>
          </View>
        </View>

        <View className="gap-4">
          <Button
            className={`h-12 w-full flex-row items-center justify-center rounded-lg border ${
              isDarkColorScheme ? 'border-zinc-700 bg-zinc-800' : 'border-gray-200 bg-white'
            }`}>
            <Text
              className={`text-base font-medium ${
                isDarkColorScheme ? 'text-zinc-100' : 'text-zinc-800'
              }`}>
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

export default RegisterScreen;
