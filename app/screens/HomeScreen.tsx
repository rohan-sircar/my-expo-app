import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';

import POSTS from '~/data/posts';
import Message from '~/app/components/Message';
import CounterControls from '~/app/components/CounterControls';
import UserDetails from '~/app/components/UserDetails';
import FetchUserDetails from '~/app/components/FetchUserDetails';
import ShowLogin from '~/app/components/ShowLogin';

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
