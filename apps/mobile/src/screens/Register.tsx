import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { RootStackParamList } from '../types/App.types';
import { registerUser } from '../services/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';

interface IUser {
  name: string;
  email: string;
  password: string;
}

const RegisterScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [formData, setFormData] = useState<IUser>({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    if (!formData.email || !formData.password || !formData.name) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    try {
      const user = await registerUser({ ...formData });

      if (user.alreadyRegistered) {
        Alert.alert('Error', 'User already exists. Please login.');
        navigation.navigate('login');
        return;
      }

      if (user.token) {
        await AsyncStorage.setItem('userToken', user.token);
        Alert.alert('Success', 'Registration successful!');
        navigation.navigate('blog');
      } else {
        Alert.alert('Error', 'Failed to retrieve token. Please try again.');
      }
    } catch (error: unknown) {
      if ((error as AxiosError)?.response?.status === 409) {
        Alert.alert('Message', 'User already exists. Please login.');
        navigation.navigate('login');
        return;
      }
      Alert.alert('Error', 'Failed to register. Please try again.');
      return;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 justify-center items-center">
      <View className="p-4">
        <Text className="text-2xl font-bold text-center mt-4 mb-4">
          Register
        </Text>
      </View>
      <View className="mx-auto w-2/3">
        <TextInput
          className="border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter your name"
          value={formData.name}
          onChangeText={(name) => setFormData({ ...formData, name })}
        />
        <TextInput
          className="border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={(email) => setFormData({ ...formData, email })}
        />
        <TextInput
          className="border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter your password"
          value={formData.password}
          onChangeText={(password) => setFormData({ ...formData, password })}
          secureTextEntry={true}
        />
        <View className="w-full flex-row justify-center">
          <Text className="text-black text-center font-bold mr-1">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text className="text-blue-500 text-center font-bold">login</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <TouchableOpacity
            className="w-1/2 bg-blue-500 rounded p-3 mt-4"
            onPress={handleSubmit}
          >
            <Text className="w-full text-white text-center font-bold">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
