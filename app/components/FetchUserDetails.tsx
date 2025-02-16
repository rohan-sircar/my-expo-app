import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useUserStore } from '../stores/UserStore';

const FetchUserDetails = () => {
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputValue}
        placeholder="Enter User ID"
        keyboardType="numeric"
        onChangeText={handleInputChange}
      />
      <Button title="Fetch User" onPress={handleSubmit} />
    </View>
  );
};

export default FetchUserDetails;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
  },
});
