import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { BlogStackParamList } from '../navigation/BlogNavigator';

type TabHeaderProps = {
  navigation: StackNavigationProp<BlogStackParamList>;
  title: string;
};

const TabHeader = ({ navigation, title }: TabHeaderProps) => {
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
