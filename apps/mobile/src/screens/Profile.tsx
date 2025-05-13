import { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { User } from '../model/Users.model';
import { formatDate } from '../utils/date.util';
import { getUserDetails } from '../utils/auth.utils';
import Loader from '../components/Loader';
import RenderField from '../components/renderField.util';

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUsersDetails = async () => {
      setIsLoading(true);
      try {
        const userDetails = await getUserDetails();
        if (userDetails) {
          setUser(userDetails);
        }
      } catch (error) {
        console.error('Error loading user details:', error);
        Alert.alert('Error', 'Failed to load user details.');
      } finally {
        setIsLoading(false);
      }
    };

    loadUsersDetails();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Loader />
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-700">No user data available.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-gray-100 flex-1">
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <Ionicons name="person-circle-outline" size={24} color="black" />
            <Text className="text-xl font-bold ml-2">Profile</Text>
          </View>
          <View className="flex-row space-x-2">
            <TouchableOpacity
              onPress={() => {
                if (isEditing) {
                  Alert.alert('Profile updated!');
                }
                setIsEditing((prev) => !prev);
              }}
              className="px-2 py-2 rounded-lg bg-blue-500 flex-row items-center"
            >
              {!isEditing && (
                <Ionicons
                  name="pencil-outline"
                  size={16}
                  color="white"
                  className="mr-2"
                />
              )}
              <Text className="text-white">
                {isEditing ? '✔️ Save' : 'Edit'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="h-40 bg-gray-300 mb-4 flex items-center justify-center rounded-lg">
            <TouchableOpacity
              onPress={() => Alert.alert('Upload cover photo functionality')}
              className="px-4 py-2 rounded-lg bg-blue-500"
            >
              <Text className="text-white">Upload Cover Photo</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-white rounded-lg p-4">
            <View className="flex-row items-center mb-4">
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="black"
                className="mr-2"
              />
              <Text className="text-lg font-semibold">User Details</Text>
            </View>
            <View className="flex-row items-center mb-4">
              <View className="mr-4 flex items-center">
                <View className="w-32 h-32 bg-gray-300 rounded-md overflow-hidden flex items-center justify-end">
                  <TouchableOpacity
                    onPress={() => Alert.alert('Upload avatar functionality')}
                    className="w-full py-2 bg-gray-500"
                  >
                    <Text className="text-center text-white">
                      Upload Avatar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="flex-1">
                {RenderField({
                  label: 'Name',
                  value: user.name,
                  placeholder: 'Enter your name',
                  isEditing,
                })}
                {RenderField({
                  label: 'Email',
                  value: user.email,
                  placeholder: 'Enter your email',
                  isEditing,
                })}
              </View>
            </View>
            <View className="flex-row items-center mb-4">
              <Ionicons
                name="document-text-outline"
                size={20}
                color="black"
                className="mr-2"
              />
              <Text className="text-lg font-semibold">Bio</Text>
            </View>
            <View className="flex-row justify-between">
              <View className="w-1/2 pr-2">
                {RenderField({
                  label: 'Phone Number',
                  value: '+1234567890',
                  placeholder: 'Enter your phone number',
                  isEditing,
                })}
              </View>
              <View className="w-1/2 pl-2">
                {RenderField({
                  label: 'DOB',
                  value: formatDate(new Date()),
                  placeholder: 'Enter your date of birth',
                  isEditing,
                })}
              </View>
            </View>
            {RenderField({
              label: 'Bio',
              value: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
              placeholder: 'Enter your bio',
              isEditing,
              multiline: true,
            })}
            {RenderField({
              label: 'Address',
              value: '123 Main St, City, Country',
              placeholder: 'Enter your address',
              isEditing,
            })}
            {isEditing && (
              <TouchableOpacity
                onPress={() => setIsEditing(false)}
                className="mt-4 px-4 py-2 rounded-lg bg-red-500 self-center"
              >
                <Text className="text-white">Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
