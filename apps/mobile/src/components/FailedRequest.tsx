import { Text, View } from "react-native";

const FailedRequest = () => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
    <Text className="text-lg font-bold text-red-600 mb-2">
      Request Failed
    </Text>
    <View className="mb-4">
    </View>
      <Text className="text-gray-700 text-center mb-4">
        Oops! Something went wrong while fetching the data. Please try again
        later.
      </Text>
      
    </View>
  );
};

export default FailedRequest;
