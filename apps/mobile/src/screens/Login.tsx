import { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { getLoginUser } from '../services/auth.service';
import { useUser } from '../store/UserContext';
import { RootStackParamList } from '../types/App.types';

interface IUser {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setUser } = useUser();
  const [formData, setFormData] = useState<IUser>({
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    try {
      const { user, token } = await getLoginUser({
        email: formData.email.toLowerCase(),
        password: formData.password,
      });
      if (token) {
        await AsyncStorage.multiSet([
          ['userToken', token],
          ['userDetails', JSON.stringify(user)],
        ]);
        setUser(user); // Update the context with the user data
        navigation.navigate('home');
      }
    } catch (error) {
      setFormData({ email: '', password: '' });
      if ((error as AxiosError)?.response?.status === 401) {
        Alert.alert('Error', 'Invalid credentials. Please try again.');
        return;
      }

      Alert.alert('Error', 'Failed to log in. Please try again.');
      return;
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        navigation.navigate('home');
      }
    };
    checkToken();
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100 justify-center items-center">
      <View className="p-4">
        <Text className="text-2xl font-bold text-center mt-4 mb-4">Login</Text>
      </View>
      <View className="mx-auto w-2/3">
        <TextInput
          className="border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter your name"
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
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('register')}>
            <Text className="text-blue-500 text-center font-bold">Sign up</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <TouchableOpacity
            className="w-1/2 bg-blue-500 rounded p-3 mt-4"
            onPress={handleSubmit}
          >
            <Text className="w-full text-white text-center font-bold">
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
