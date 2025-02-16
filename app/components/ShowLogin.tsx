import { View, Text } from 'react-native';
import { useNavigation } from 'expo-router';
import { RootStackParamList } from '~/types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useColorScheme } from '~/lib/useColorScheme';
import React from 'react';
import { Button } from '~/components/nativewindui/Button';
import { StyleSheet } from 'react-native';

const ShowLogin = () => {
  const { colors, isDarkColorScheme } = useColorScheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View
      style={{
        padding: 16,
        borderRadius: 8,
        backgroundColor: colors.card,
        shadowColor: isDarkColorScheme ? '#000000' : '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDarkColorScheme ? 0.4 : 0.2,
        shadowRadius: 4,
        elevation: 4,
      }}>
      {/* <Button style={styles.blueButton}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Button> */}
      <Button
        className="text-strong mb-3 text-white"
        variant="primary"
        style={{ backgroundColor: colors.primary }}
        onPress={() => navigation.navigate('login')}>
        <Text style={{ color: '#E4E4E7' }}>Login</Text>
      </Button>
      <Button
        className="text-strong mb-3 text-white"
        variant="primary"
        style={{ backgroundColor: colors.primary }}
        onPress={() => navigation.navigate('register')}>
        <Text style={{ color: '#E4E4E7' }}>Register</Text>
      </Button>
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

export default ShowLogin;
