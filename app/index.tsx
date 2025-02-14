import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';

import POSTS from '../data/posts';
import Message from './components/Message';
import CounterControls from './components/CounterControls';
import UserDetails from './components/UserDetails';
import FetchUserDetails from './components/FetchUserDetails';

const Home = () => {
  return (
    <View className="flex-1 px-4 md:px-8">
      <CounterControls />
      <FetchUserDetails />
      <UserDetails />
      <FlashList
        data={POSTS}
        renderItem={({ item }) => <Message {...item} />}
        estimatedItemSize={150}
      />
    </View>
  );
};

export default Home;
