import { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { getUser } from '../services/profile.service';
import Loader from './Loader';
import FailedRequest from './FailedRequest';
import { logoutUser } from '../services/auth.service';
import { RootStackParamList } from '../types/App.types';

interface IUserHeader {
  title: string;
}

const UserHeader = ({ title }: IUserHeader) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isModalVisible, setModalVisible] = useState(false);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => await getUser().then((res) => res),
    staleTime: 1000 * 60 * 5,
  });

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigation.navigate('login');
      Alert.alert('Logout', 'You have been logged out successfully.');
    } catch {
      Alert.alert('Failed to log out. Please try again.');
      return;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <FailedRequest />;
  }

  return (
    <SafeAreaView className="bg-white">
      <View className="relative">
        <View className="mt-5 flex-row items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
          <Text className="text-lg font-bold text-gray-800">{title}</Text>
          <TouchableOpacity
            className="p-2"
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="person-circle-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
        {isModalVisible && (
          <View className="absolute top-[100%] right-5 flex-1 justify-center items-center">
            <View className="w-full bg-white rounded-lg p-4 shadow-lg">
              <Text className="text-xl font-bold text-gray-800 mb-4">
                {user?.name || 'User Name'}
              </Text>
              <Text className="text-sm text-gray-600 mb-2">{user?.email}</Text>
              <TouchableOpacity
                className="w-full bg-red-400 rounded-md py-2 mb-3 self-center"
                onPress={handleLogout}
              >
                <Text className="text-white text-center font-semibold">
                  Logout
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="absolute top-2 right-0 p-2"
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close-circle-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default UserHeader;
