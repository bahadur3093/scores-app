import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  createComment,
  getCommentsByPostId,
} from '../services/comment.service';
import Loader from './Loader';
import FailedRequest from './FailedRequest';
import CommentCard from '../screens/CommentCard';
import { useUser } from '../store/UserContext';
import { ICommentPayload } from '../model/Comment.model';
import { IComment } from '../model/Post.model';
import ReplyInputBox from './ReplyInputBox';

interface IBlogComment {
  postId: string;
}

const BlogComment = ({ postId }: IBlogComment) => {
  const { user } = useUser();
  const [newComment, setNewComment] = useState<string>('');
  const [isCommentVisible, setIsCommentVisible] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const mutation = useMutation<IComment, unknown, ICommentPayload>({
    mutationFn: (payload: ICommentPayload) => createComment(postId, payload),
    onSuccess: (newComment: IComment) => {
      queryClient.setQueryData<IComment[]>(['comments', postId], (oldData) => {
        return [...(oldData || []), newComment];
      });
      setNewComment('');
    },
    onError: (error) => {
      console.error('Error adding comment:', error);
    },
  });

  const handleAddComment = () => {
    if (newComment.trim()) {
      const payload: ICommentPayload = {
        content: newComment,
        postId,
        authorId: user?.id || '',
        author: user?.name || '',
      };
      mutation.mutate(payload);
    }
  };

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['comments', postId],
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
    <View className="flex-1 bg-white p-4">
      <View className="flex-row items-center justify-between my-2">
        <Text className="text-xl font-bold text-gray-900">Comments</Text>
        <TouchableOpacity
          onPress={() => setIsCommentVisible(!isCommentVisible)}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      {isCommentVisible && (
        <View className="flex-row items-center justify-between">
          <ReplyInputBox
            value={newComment}
            setValue={setNewComment}
            handleAddValue={handleAddComment}
          />
        </View>
      )}
      {comments &&
        comments.map((comment) => (
          <CommentCard key={comment.commentId} comment={comment} />
        ))}
    </View>
  );
};

export default BlogComment;
