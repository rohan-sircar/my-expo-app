import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getAccentSet, useAccentColor } from '~/lib/useAccentColor';
import { useColorScheme } from '~/lib/useColorScheme';
import { DrawerParamList, navigateWithTitle } from '~/types/navigation';
import FormButton from '../components/FormButton';
import GithubButton from '../components/GithubButton';
import GoogleButton from '../components/GoogleButton';
import { useUserStore } from '../stores/UserStore';
import * as Style from '../styles/Styles';

const LoginScreen = () => {
  const { colors, isDarkColorScheme } = useColorScheme();
  const { userId } = useUserStore();
  const { accentColor } = useAccentColor();
  const accentSet = getAccentSet(accentColor);
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

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
            onPress={() => {
              useUserStore.setState({ loggedIn: true });
              navigateWithTitle(
                () =>
                  navigation.navigate('Home', {
                    screen: 'Profile',
                    params: { userId: userId?.toString() },
                  }),
                'Profile'
              );
            }}></FormButton>
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
