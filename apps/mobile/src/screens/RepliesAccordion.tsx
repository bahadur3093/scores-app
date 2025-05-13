import { Text, TouchableOpacity, View } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { getShortDate } from '../utils/date.util';
import {
  createReply,
  getRepliesByCommentId,
} from '../services/comment.service';
import { IReply } from '../model/Post.model';
import { IReplyPayload } from '../model/Reply.model';
import { useUser } from '../store/UserContext';
import Loader from '../components/Loader';
import FailedRequest from '../components/FailedRequest';
import ReplyInputBox from '../components/ReplyInputBox';

interface IRepliesAccordion {
  commentId: string;
}

const RepliesAccordion = ({ commentId }: IRepliesAccordion) => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const [repliesVisible, setRepliesVisible] = useState(false);
  const [replyInputVisible, setReplyInputVisible] = useState(false);
  const [newReply, setNewReply] = useState('');

  const {
    data: replies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['comment-replies', commentId],
    queryFn: async () =>
      await getRepliesByCommentId(commentId).then((res) => res),
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation<IReply, unknown, IReplyPayload>({
    mutationFn: (payload: IReplyPayload) => createReply(commentId, payload),
    onSuccess: (newReply: IReply) => {
      queryClient.setQueryData<IReply[]>(
        ['comment-replies', commentId],
        (oldData) => {
          return [...(oldData || []), newReply];
        }
      );
      setNewReply('');
      setRepliesVisible(true);
      setReplyInputVisible(false);
    },
    onError: (error) => {
      console.error('Error adding reply:', error);
    },
  });

  const handleAddReply = () => {
    if (newReply.trim()) {
      const payload: IReplyPayload = {
        content: newReply,
        commentId,
        authorId: user?.id || '',
        author: user?.name || '',
      };
      mutation.mutate(payload);
    }
  };

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
    <View className="mb-2">
      <TouchableOpacity
        onPress={() => setReplyInputVisible(!replyInputVisible)}
        className="flex-row items-center mb-2"
      >
        <Text className="text-sm text-gray-700 font-medium mr-1">
          {replyInputVisible ? 'Cancel' : 'Reply'}
        </Text>
        <Ionicons name="arrow-undo-outline" size={16} color="gray" />
      </TouchableOpacity>
      {replyInputVisible && (
        <ReplyInputBox
          value={newReply}
          setValue={setNewReply}
          handleAddValue={handleAddReply}
        />
      )}
      {replies && replies.length > 0 && (
        <>
          <View className="flex-row items-center justify-end">
            <TouchableOpacity
              onPress={() => setRepliesVisible(!repliesVisible)}
              className="flex-row items-center"
            >
              <Text className="text-xs text-blue-500 font-medium">
                {repliesVisible
                  ? 'Hide Replies'
                  : `View Replies (${replies.length})`}
              </Text>
            </TouchableOpacity>
          </View>
          {repliesVisible && (
            <View className="mt-2">
              {replies.map((reply, index) => (
                <View key={index} className="mt-2 flex-row items-start">
                  <View className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mr-3">
                    <Text className="text-sm font-bold text-white">
                      {reply.author
                        ? reply.author
                            .split(' ')
                            .map((name) => name[0])
                            .join('')
                            .toUpperCase()
                        : 'G'}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-sm font-semibold text-gray-800">
                        {reply.author || 'Ghost'}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {getShortDate(new Date(reply.updatedAt))}
                      </Text>
                    </View>
                    <Text className="text-sm text-gray-600 mt-1">
                      {reply.content}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default RepliesAccordion;
