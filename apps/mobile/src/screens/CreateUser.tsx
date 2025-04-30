import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const CreateUser = () => {
    const createNewUsersHandler = () => {
        console.log('Create new user');
    }

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4">Create New User</Text>
      <TextInput
        className="w-full bg-white p-3 rounded-lg mb-4 border border-gray-300"
        placeholder="Enter username"
      />
      <TextInput
        className="w-full bg-white p-3 rounded-lg mb-4 border border-gray-300"
        placeholder="Enter email"
        keyboardType="email-address"
      />
      <TextInput
        className="w-full bg-white p-3 rounded-lg mb-4 border border-gray-300"
        placeholder="Enter password"
        secureTextEntry
      />
      <TouchableOpacity className="w-full bg-blue-500 p-3 rounded-lg" onPress={createNewUsersHandler}>
        <Text className="text-white text-center font-bold">Create User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateUser;
