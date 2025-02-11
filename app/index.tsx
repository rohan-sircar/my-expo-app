import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';

import POSTS from '../data/posts';
import Message from './components/Message';

const Home = () => {
  return (
    <View className="flex-1 px-4 md:px-8">
      <FlashList
        data={POSTS}
        renderItem={({ item }) => <Message {...item} />}
        estimatedItemSize={150}
      />
    </View>
  );
};

export default Home;
