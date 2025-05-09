import { Text, TouchableOpacity, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { formatDate } from '../utils/date.util';
import { getRepliesByCommentId } from '../services/comment.service';
import Loader from '../components/Loader';
import FailedRequest from '../components/FailedRequest';

interface IRepliesAccordion {
  commentId: string;
}

const RepliesAccordion = ({ commentId }: IRepliesAccordion) => {
  const {
    data: replies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post-comments', commentId],
    queryFn: async () =>
      await getRepliesByCommentId(commentId).then((res) => res),
    staleTime: 1000 * 60 * 5,
  });
  const [repliesVisible, setRepliesVisible] = useState(false);
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
    replies &&
    replies.length > 0 && (
      <View className="mt-4">
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
        {repliesVisible && (
          <View className="mt-4 pl-6 border-l-2 border-gray-200">
            {replies.map((reply, index) => (
              <View key={index} className="mt-2 flex-row items-start">
                <View className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <Text className="text-sm font-bold text-white">AB</Text>
                </View>
                <View className="flex-1">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-sm font-semibold text-gray-800">
                      Alice Brown
                    </Text>
                    <Text className="text-xs text-gray-500">
                      {formatDate(new Date(reply.createdAt))}
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
      </View>
    )
  );
};

export default RepliesAccordion;
