import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { useUserStore } from '../stores/UserStore';
import { useColorScheme } from '~/lib/useColorScheme';
import { Button } from '~/components/nativewindui/Button';
import * as Style from '../styles/Styles';
import { getAccentSet, useAccentColor } from '~/lib/useAccentColor';
import FormButton from '../components/FormButton';

const FetchUserDetails = () => {
  const { colors, isDarkColorScheme } = useColorScheme();
  const { accentColor } = useAccentColor();
  const accentSet = getAccentSet(accentColor);
  // local state to hold the text input value
  const [inputValue, setInputValue] = useState('');
  //   const setUserId = useUserStore((state) => state.setUserId);
  //   const { setUserId } = useUserStore();

  // handler for text input change
  const handleInputChange = (value: string) => {
    // update local state
    setInputValue(value);
  };

  // on submit, attempt to parse and update the global store
  const handleSubmit = () => {
    const parsedId = parseInt(inputValue, 10);
    if (!isNaN(parsedId)) {
      //   setUserId(parsedId);
      useUserStore.setState({ userId: parsedId });
    } else {
      console.error('Invalid User ID provided');
    }
  };

  return (
    <View className="mb-6 gap-4" style={Style.cardStyle(isDarkColorScheme, colors, accentSet)}>
      <TextInput
        keyboardType="numeric"
        placeholder="Enter User ID"
        secureTextEntry
        className={`h-12 rounded-lg border px-4 text-base`}
        style={Style.inputStyle(isDarkColorScheme, accentSet)}
        placeholderTextColor={Style.getPlaceholderColor(isDarkColorScheme, accentSet)}
        value={inputValue}
        onChangeText={handleInputChange}
      />
      <View className="gap-4">
        <FormButton buttonText="Fetch User" onPress={handleSubmit}></FormButton>
      </View>
    </View>
  );
};

export default FetchUserDetails;
