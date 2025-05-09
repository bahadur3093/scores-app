import { useQuery } from '@tanstack/react-query';
import { Button, Image, ScrollView, Text, View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

import Loader from '../components/Loader';
import FailedRequest from '../components/FailedRequest';
import { getPostById } from '../services/post.service';
import { formatDate } from '../utils/date.util';
import BlogComment from '../components/BlogComment';

type RootStackParamList = {
  PostDetails: {
    postId: string;
  };
};

const PostDetails = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'PostDetails'>>();
  const { postId } = route.params;
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post-details', postId],
    queryFn: async () => await getPostById(postId).then((res) => res),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <FailedRequest />;
  }

  if (!post) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center text-gray-500">
          No post details available
        </Text>
      </View>
    );
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-1 bg-gray-100 bg-white p-4">
        <View>
          <View className="mb-4">
            <View className="w-full bg-gray-300 rounded-lg overflow-hidden">
              <Image
                source={{
                  uri: post.cover,
                }}
                className="w-full h-40 rounded-lg"
                resizeMode="cover"
              />
            </View>
          </View>
          <View className="mb-4">
            <Text className="text-2xl font-bold text-gray-800">
              {post.title}
            </Text>
          </View>
          <View className="mb-4">
            <Text className="text-gray-600">{post.content}</Text>
          </View>
          <View className="mt-4">
            <Text className="text-sm text-gray-500">Author: {post.author}</Text>
            <Text className="text-sm text-gray-500">
              Published: {formatDate(post.createdAt)}
            </Text>
          </View>
        </View>
        <BlogComment postId={post._id} />
      </View>
    </ScrollView>
  );
};

export default PostDetails;
