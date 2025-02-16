import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';

import Message from '~/app/components/Message';
import POSTS from '~/data/posts';

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
