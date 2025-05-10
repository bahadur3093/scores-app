import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { isEmpty } from 'lodash';

import { RootStackParamList } from '../types/App.types';
import { logoutUser } from '../services/auth.service';
import { useUser } from '../store/UserContext';

const Header = (props: DrawerContentComponentProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user } = useUser();

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

  if (isEmpty(user)) {
    return (
      <View className="flex-1 p-5 bg-gray-100">
        <View className="mt-10 mb-5">
          <TouchableOpacity
            className="flex-row items-center p-3 bg-gray-200 rounded-lg"
            onPress={() => navigation.navigate('login')}
          >
            <Ionicons
              name="log-in-outline"
              size={24}
              color="gray"
              className="mr-3"
            />
            <Text className="text-black font-semibold text-lg">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 p-5 bg-gray-100">
      <View className="mt-10 mb-5">
        {user ? (
          <TouchableOpacity
            className="flex-row items-center space-x-4"
            onPress={() => navigation.navigate('profile')}
          >
            <View className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <Text className="text-xl font-bold text-white">
                {user.name?.replace(/[^A-Z]/g, '').toUpperCase() ||
                  user.name[0].toUpperCase()}
              </Text>
            </View>
            <View className="px-2">
              <Text className="text-lg font-semibold">{user.name}</Text>
              <Text className="text-sm text-gray-500">{user.email}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="flex-row items-center p-3 bg-gray-200 rounded-lg"
            onPress={() => navigation.navigate('login')}
          >
            <Ionicons
              name="log-in-outline"
              size={24}
              color="gray"
              className="mr-3"
            />
            <Text className="text-black font-semibold text-lg">Login</Text>
          </TouchableOpacity>
        )}
        <View className="border-t border-gray-300 mt-5" />
      </View>
      <TouchableOpacity
        className="flex-row items-center my-2 p-3 bg-gray-200 rounded-lg"
        onPress={() => navigation.navigate('home')}
      >
        <Ionicons name="home-outline" size={32} color="gray" className="mr-3" />
        <Text className="text-black font-semibold text-lg">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center my-2 p-3 bg-gray-200 rounded-lg"
        onPress={() => navigation.navigate('blogs')}
        disabled={!user}
      >
        <Ionicons name="book-outline" size={32} color="gray" className="mr-3" />
        <Text className="text-black font-semibold text-lg">Blogs</Text>
      </TouchableOpacity>
      <View className="border-t border-gray-300 mt-auto pt-4 mb-4">
        <TouchableOpacity
          disabled={!user}
          className="flex-row items-center p-3 bg-gray-200 rounded-lg"
          onPress={() => {
            handleLogout();
            props.navigation.closeDrawer();
          }}
        >
          <Ionicons
            name="log-out-outline"
            size={32}
            color="gray"
            className="mr-3"
          />
          <Text className="text-black font-semibold text-lg">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
