import { useQuery } from '@tanstack/react-query';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getUsers } from '../services/profile.service';
import Loader from '../components/Loader';
import FailedRequest from '../components/FailedRequest';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => await getUsers().then((res) => res),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <FailedRequest />;
  }

  return (
    <View>
      <Text className="text-2xl font-bold text-center mt-4 mb-4">
        User Profiles
      </Text>
      {users &&
        users.map((user) => (
          <View
            key={user.id}
            className="m-2 p-4 border border-gray-300 rounded-lg bg-gray-100 shadow-sm"
          >
            <Text className="text-lg font-bold text-gray-800">{user.name}</Text>
            <Text className="text-gray-600 mt-1">{user.email}</Text>
          </View>
        ))}
      <View className="mt-4">
        <Text
          onPress={() => navigation.navigate('createUser')}
          className="text-center text-blue-500 font-bold"
        >
          Create New User
        </Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
