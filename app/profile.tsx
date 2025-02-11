import { Ionicons } from '@expo/vector-icons';
import { FlashList, MasonryFlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';

import POSTS from '../data/posts';
import USERS from '../data/users';
import Avatar from './components/Avatar';
import Message from './components/Message';
import StatTile from './components/StatTile';

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
  const userIdNumber = parseInt(userId as string, 10);
  const userPosts = POSTS.filter((post: Post) => post.userId === userIdNumber);
  const user = USERS[userIdNumber as keyof typeof USERS] as User;

  if (!user) return null;

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.profileLayout}>
            <Avatar userId={userId} style={styles.avatar} size={64} />
            <View>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.secondary}>@{user.handle}</Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <Pressable style={[styles.button, { marginRight: 8 }]}>
              <Text style={{ fontWeight: '500', color: '#666' }}>Following</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buttonActive]}>
              <Text style={{ fontWeight: '500', color: '#fff' }}>Message</Text>
            </Pressable>
          </View>
          <Text style={styles.about}>About me</Text>
          <Text style={styles.secondary}>{user.about}</Text>
          <View style={styles.stats}>
            <StatTile title="followers" value={user.followers} />
            <StatTile title="following" value={user.following} />
            <StatTile title="posts" value={userPosts.length} />
          </View>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Posts</Text>
            <View style={styles.displayMode}>
              <TouchableOpacity
                style={[styles.iconButton, listMode === 'masonry' && styles.iconButtonActive]}
                onPress={() => setListMode('masonry')}>
                <Ionicons name="grid-outline" size={20} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.iconButton, listMode === 'list' && styles.iconButtonActive]}
                onPress={() => setListMode('list')}>
                <Ionicons name="list-outline" size={20} color="#666" />
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
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 1000,
    alignItems: 'center',
  },
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: '100%',
  },
  avatar: {
    marginRight: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  about: {
    fontWeight: '500',
    marginBottom: 8,
  },
  profileLayout: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
  },
  secondary: {
    color: '#888',
    paddingRight: 12,
  },
  buttons: {
    flexDirection: 'row',
    paddingLeft: 80,
    marginBottom: 16,
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#eee',
  },
  buttonActive: {
    backgroundColor: '#0081f1',
  },
  stats: {
    marginTop: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    paddingRight: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    justifyContent: 'space-between',
  },
  headerTitle: { fontWeight: '500', alignSelf: 'center' },
  displayMode: {
    flexDirection: 'row',
  },
  iconButton: {
    marginRight: 12,
    padding: 4,
  },
  iconButtonActive: {
    backgroundColor: '#eee',
    borderRadius: 4,
  },
});
