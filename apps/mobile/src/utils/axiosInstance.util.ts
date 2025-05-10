import axios from 'axios';

import { BASE_URL } from '../config/urls.config';
import { getToken } from './auth.utils';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

const URLS_TO_SKIP = ['login', 'register', 'validate-token'];

api.interceptors.request.use(
  async (config) => {
    try {
      if (config.url && !URLS_TO_SKIP.includes(config.url)) {
        const token = await getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error('Error retrieving token from AsyncStorage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
