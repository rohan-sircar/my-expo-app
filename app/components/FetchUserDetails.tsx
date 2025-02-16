import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useUserStore } from '../stores/UserStore';
import { useColorScheme } from '~/lib/useColorScheme';
import { cardStyle, inputStyle } from '../styles/Styles';

const FetchUserDetails = () => {
  const { colors, isDarkColorScheme } = useColorScheme();
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
    <View style={cardStyle(isDarkColorScheme, colors)}>
      <TextInput
        placeholder="Enter User ID"
        className={`h-12 rounded-lg border px-4 text-base ${
          isDarkColorScheme
            ? 'border-zinc-700 bg-zinc-800 text-zinc-100'
            : 'border-gray-200 bg-white text-zinc-800'
        }`}
        style={inputStyle()}
        keyboardType="numeric"
        placeholderTextColor={isDarkColorScheme ? '#71717a' : '#9ca3af'}
        value={inputValue}
        onChangeText={handleInputChange}
      />
      <Button title="Fetch User" onPress={handleSubmit} />
    </View>
  );
};

export default FetchUserDetails;
