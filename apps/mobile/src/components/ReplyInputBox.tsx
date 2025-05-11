import { TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IReplyInputBox {
  value: string;
  setValue: (reply: string) => void;
  handleAddValue: () => void;
}

const ReplyInputBox = ({ value, setValue, handleAddValue }: IReplyInputBox) => {
  return (
    <View className="flex-row items-center mt-4 border border-gray-300 rounded-md p-2">
      <TextInput
        className="flex-1 text-sm"
        placeholder="Add a reply..."
        value={value}
        onChangeText={setValue}
      />
      <TouchableOpacity onPress={handleAddValue} className="ml-2">
        <Ionicons name="send" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default ReplyInputBox;
