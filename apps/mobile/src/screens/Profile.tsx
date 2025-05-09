import { SafeAreaView, Text, View } from 'react-native';

const ProfileScreen = () => {
  return (
    <SafeAreaView className="bg-gray-100">
      <View className="p-4">
        <Text className="text-2xl font-bold text-center mt-4 mb-4">
          Profile page
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
