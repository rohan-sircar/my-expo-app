import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { useUserStore } from '../stores/UserStore';
import { useColorScheme } from '~/lib/useColorScheme';
import { cardStyle, inputStyle } from '../styles/Styles';
import { Button } from '~/components/nativewindui/Button';
import * as Style from '../styles/Styles';

const FetchUserDetails = () => {
  const { colors, isDarkColorScheme, accentSet } = useColorScheme();
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
    <View className="mb-6 gap-4" style={cardStyle(isDarkColorScheme, colors, accentSet)}>
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
      <View>
        <Button
          className="h-12"
          style={Style.formButton(isDarkColorScheme, accentSet)}
          onPress={handleSubmit}>
          <Text style={Style.formButtonText(isDarkColorScheme, accentSet)}>Fetch user</Text>
        </Button>
      </View>
    </View>
  );
};

export default FetchUserDetails;
