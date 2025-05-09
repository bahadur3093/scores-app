import { View } from 'react-native';

const Loader = () => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100 relative z-50">
      <View className="animate-spin h-20 w-20 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></View>
    </View>
  );
};

export default Loader;
