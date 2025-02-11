import { View, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';

import POSTS from '../data/posts';
import Message from './components/Message';

const Home = () => {
  const { width } = useWindowDimensions();

  const dynamicStyles = StyleSheet.create({
    wrapper: {
      flex: 1,
      maxWidth: 800,
      width: '100%',
      marginHorizontal: 'auto',
    },
    container: {
      flex: 1,
      paddingLeft: width > 600 ? 32 : 16,
      paddingRight: width > 600 ? 32 : 16,
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.wrapper}>
      <View style={dynamicStyles.container}>
        <FlashList
          data={POSTS}
          renderItem={({ item }) => <Message {...item} />}
          estimatedItemSize={150}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
