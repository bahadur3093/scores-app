import { useQuery } from '@tanstack/react-query';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { getPosts } from '../services/post.service';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParamList } from '../types/App.types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Loader from '../components/Loader';
import FailedRequest from '../components/FailedRequest';
import BlogCard from '../components/BlogCard';
import { useCallback } from 'react';

const BlogScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => await getPosts().then((res) => res),
    staleTime: 1000 * 60 * 5,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <FailedRequest />;
  }

  if (!posts || posts.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <View className="p-5 rounded-lg bg-gray-100 shadow-md">
          <Text className="text-center text-gray-500 mb-4">
            No posts available
          </Text>
          <View className="items-center">
            <View className="bg-blue-600 px-4 py-2 rounded-lg">
              <Text
                className="text-white font-semibold"
                onPress={() =>
                  navigation.navigate('blog', { screen: 'createPost' })
                }
              >
                Create New post
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      showsVerticalScrollIndicator={false}
    >
      <View className="mt-4 flex justify-end items-end px-4">
        <View className="flex flex-row items-center bg-blue-600 p-3 rounded-full shadow-lg">
          <Ionicons name="add" size={24} color="white" style={{ marginRight: 8 }} />
          <Text
        className="text-white font-bold text-center"
        onPress={() =>
          navigation.navigate('blog', { screen: 'createPost' })
        }
          >
        Create new post
          </Text>
        </View>
      </View>
      <View className="p-4">
        {posts &&
          posts.length > 0 &&
          posts.map((post) => <BlogCard key={post.id} post={post} />)}
      </View>
    </ScrollView>
  );
};

export default BlogScreen;
