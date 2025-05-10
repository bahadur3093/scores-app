import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

const TabHeader = ({ navigation, title }) => {
  return (
    <View className="flex-row items-center justify-between p-4 bg-gray-100">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={32} color="gray" />
      </TouchableOpacity>
      <Text className="text-lg font-bold">{title}</Text>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Ionicons name="close-outline" size={32} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default TabHeader;
