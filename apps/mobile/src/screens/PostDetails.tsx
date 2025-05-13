import { useQuery } from '@tanstack/react-query';
import { Image, ScrollView, Text, View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import { useState } from 'react';

import Loader from '../components/Loader';
import FailedRequest from '../components/FailedRequest';
import BlogComment from '../components/BlogComment';
import { getPostById } from '../services/post.service';
import { formatDate } from '../utils/date.util';

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

  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent((prev) => !prev);
  };

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
            <RenderHTML
              source={{
                html: showFullContent
                  ? post.content
                  : post.content.slice(0, 500) +
                    (post.content.length > 500 ? '...' : ''),
              }}
            />
            {post.content.length > 500 && (
              <View className="items-center mt-2">
                <Text
                  onPress={toggleContent}
                  className="text-white text-center bg-blue-600 px-4 py-2 rounded-lg"
                >
                  {showFullContent ? 'Show Less' : 'Load More'}
                </Text>
              </View>
            )}
          </View>
          <View className="mt-4">
            <Text className="text-sm text-gray-500">Author: {post.author}</Text>
            <Text className="text-sm text-gray-500">
              Published: {formatDate(post.createdAt)}
            </Text>
          </View>
        </View>
        <BlogComment postId={post.postId} />
      </View>
    </ScrollView>
  );
};

export default PostDetails;
