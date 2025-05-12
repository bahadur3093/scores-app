import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { getShortDate } from '../utils/date.util';
import { IComment } from '../model/Post.model';
import RepliesAccordion from './RepliesAccordion';

interface ICommentCard {
  comment: IComment;
}

const CommentCard = ({ comment }: ICommentCard) => {
  return (
    <View className="my-2 flex-row items-start border-b border-gray-200">
      <View className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mr-3">
        <Text className="text-lg font-bold text-white">
          {(comment.author || 'Ghost')
            .split(' ')
            .map((name) => name[0])
            .join('')
            .toUpperCase()}
        </Text>
      </View>
      <View className="flex-1">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Text className="text-xl font-semibold text-gray-800">
              {comment.author || 'Ghost'}
            </Text>
            <Text className="text-xs text-gray-500 ml-2">
              • {getShortDate(comment.updatedAt)}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons
              name={comment.isLiked ? 'heart' : 'heart-outline'}
              size={14}
              color={comment.isLiked ? 'red' : 'black'}
              className="mr-1"
              onPress={() => console.log('Liked')}
            />
            <Text className="text-sm text-gray-600 mr-2">
              {comment.likes || 0}
            </Text>
            <Ionicons
              name="share-social-outline"
              size={14}
              color="black"
              className="ml-1"
              onPress={() => console.log('Shared')}
            />
          </View>
        </View>
        <Text className="text-sm text-gray-600 mt-1">{comment.content}</Text>
        <RepliesAccordion commentId={comment.commentId} />
      </View>
    </View>
  );
};

export default CommentCard;
