import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';

import POSTS from '../data/posts';
import Message from './components/Message';

const { width } = Dimensions.get('window');

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <FlashList
          data={POSTS}
          renderItem={({ item }) => <Message {...item} />}
          estimatedItemSize={150}
          style={{ width: width - 32 }} // Account for horizontal padding
          contentContainerStyle={{ paddingVertical: 16 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  contentContainer: {
    maxWidth: 1000,
    width: '100%',
  },
});
