import { useQuery } from '@tanstack/react-query';
import { Text, View } from 'react-native';

import { getCommentsByPostId } from '../services/comment.service';
import Loader from './Loader';
import FailedRequest from './FailedRequest';
import CommentCard from '../screens/CommentCard';

interface IBlogComment {
  postId: string;
}

const BlogComment = ({ postId }: IBlogComment) => {
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['comment-replies', postId],
    queryFn: async () => await getCommentsByPostId(postId).then((res) => res),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <View className="relative h-20">
        <Loader />
      </View>
    );
  }

  if (error) {
    return <FailedRequest />;
  }

  return (
    <View>
      <Text className="text-xl font-bold text-gray-900 my-2">Comments</Text>
      {comments && comments?.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </View>
  );
};

export default BlogComment;
