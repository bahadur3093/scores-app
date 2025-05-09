import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { IPost } from '../model/Post.model';
import { RootStackParamList } from '../types/App.types';

interface IBlogCard {
  post: IPost;
}
const BlogCard = ({ post }: IBlogCard) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const navigateToDetails = (postId: string) => {
    navigation.navigate('blog', { screen: 'postDetails', params: { postId } });
  };

  return (
    <TouchableOpacity
      key={post._id}
      className="mb-4 p-4 bg-white rounded-lg shadow-md"
      onPress={() => {
        navigateToDetails(post._id);
      }}
    >
      <View className="mb-2">
        <Image
          source={{
            uri: post.cover,
          }}
          className="w-full h-40 rounded-lg"
          resizeMode="cover"
        />
      </View>
      <Text className="text-xl font-semibold mb-2">{post.title}</Text>
      <Text className="text-gray-600 mb-2">{post.summary}</Text>
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-500 text-sm">By {post?.author || '-'}</Text>
        <Text className="text-gray-500 text-sm">
          {new Date(post.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BlogCard;
