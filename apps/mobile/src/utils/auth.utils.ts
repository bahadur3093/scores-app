import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

export const getToken = async () => {
  const token = await AsyncStorage.getItem('userToken');
  return token;
};


export const isTokenValid = async () => {
  const token = await getToken();
  if (!token) return false;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      await AsyncStorage.removeItem('userToken');
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error decoding token:', error);
    await AsyncStorage.removeItem('userToken');
    return false;
  }
};