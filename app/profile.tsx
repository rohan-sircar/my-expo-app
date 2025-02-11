import { Ionicons } from '@expo/vector-icons';
import { FlashList, MasonryFlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import POSTS from '../data/posts';
import USERS from '../data/users';
import Avatar from './components/Avatar';
import Message from './components/Message';
import StatTile from './components/StatTile';

import { useColorScheme } from '~/lib/useColorScheme';

interface User {
  name: string;
  handle: string;
  about: string;
  followers: number;
  following: number;
}

interface Post {
  message: string;
  userId: number;
  likes: number;
  replies: number;
}

export default function Profile() {
  const [listMode, setListMode] = useState<'list' | 'masonry'>('list');
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const { isDarkColorScheme } = useColorScheme();

  const userIdNumber = parseInt(userId, 10);
  const userPosts = POSTS.filter((post: Post) => post.userId === userIdNumber);
  const user = USERS[userIdNumber as keyof typeof USERS] as User;

  if (!user) return null;

  return (
    <View className="w-full flex-1 items-center">
      <View className="w-full flex-1 px-4 py-4 md:px-8">
        <View className="mb-1 flex-row items-center">
          <Avatar userId={userIdNumber} style={styles.avatarContainer} size={64} />
          <View>
            <Text className="mb-1 text-lg font-semibold">{user.name}</Text>
            <Text className="text-gray-500">@{user.handle}</Text>
          </View>
        </View>

        <View className="mb-4 flex-row items-center pl-20">
          <Pressable className="mr-2 rounded-2xl bg-gray-100 px-5 py-1.5 dark:bg-gray-800">
            <Text className="font-medium text-gray-600 dark:text-gray-300">Following</Text>
          </Pressable>
          <Pressable className="rounded-2xl bg-blue-500 px-5 py-1.5">
            <Text className="font-medium text-white">Message</Text>
          </Pressable>
        </View>

        <Text className="mb-2 font-medium">About me</Text>
        <Text className="pr-3 text-gray-500">{user.about}</Text>

        <View className="mt-5 flex-row justify-between border-b border-t border-gray-200 py-5 dark:border-gray-700">
          <StatTile title="followers" value={user.followers} />
          <StatTile title="following" value={user.following} />
          <StatTile title="posts" value={userPosts.length} />
        </View>

        <View className="flex-row justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-700">
          <Text className="self-center font-medium">Posts</Text>
          <View className="flex-row">
            <TouchableOpacity
              className={`mr-3 p-1 ${listMode === 'masonry' ? 'rounded bg-gray-100 dark:bg-gray-800' : ''}`}
              onPress={() => setListMode('masonry')}>
              <Ionicons name="grid-outline" size={20} color={isDarkColorScheme ? '#999' : '#666'} />
            </TouchableOpacity>
            <TouchableOpacity
              className={`p-1 ${listMode === 'list' ? 'rounded bg-gray-100 dark:bg-gray-800' : ''}`}
              onPress={() => setListMode('list')}>
              <Ionicons name="list-outline" size={20} color={isDarkColorScheme ? '#999' : '#666'} />
            </TouchableOpacity>
          </View>
        </View>

        {listMode === 'list' ? (
          <FlashList
            data={userPosts}
            renderItem={({ item }) => <Message skipHeader {...item} />}
            estimatedItemSize={100}
          />
        ) : (
          <MasonryFlashList
            numColumns={2}
            data={userPosts}
            renderItem={({ item }) => <Message masonry skipHeader {...item} />}
            estimatedItemSize={150}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    marginRight: 16,
  },
});
