import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PageHeader = ({ title, onMenuToggle }) => {
  return (
    <SafeAreaView className="bg-gray-100">
      <View className="flex-row items-center justify-between p-4 relative">
        <TouchableOpacity onPress={onMenuToggle} className="absolute left-4">
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PageHeader;
