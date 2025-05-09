import { Text, View } from 'react-native';

import { formatDate } from '../utils/date.util';
import { IComment } from '../model/Post.model';
import RepliesAccordion from './RepliesAccordion';

interface ICommentCard {
  comment: IComment;
}

const CommentCard = ({ comment }: ICommentCard) => {
  return (
    <View className="mt-2 p-4 flex-row items-start">
      <View className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
        <Text className="text-lg font-bold text-white">JD</Text>
      </View>
      <View className="flex-1">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-semibold text-gray-800">John Doe</Text>
          <Text className="text-xs text-gray-500">
            {formatDate(comment.createdAt)}
          </Text>
        </View>
        <Text className="text-sm text-gray-600 mt-1">{comment.content}</Text>
        <View className="flex-row justify-end items-center mt-3">
          <Text className="text-xs text-blue-500 font-medium">Reply</Text>
        </View>
        <RepliesAccordion commentId={comment._id} />
      </View>
    </View>
  );
};

export default CommentCard;
