import { ActivityIndicator, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackParamList } from '../types/App.types';
import Layout from '../components/Layout';

// Screens
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import UserHeader from '../components/UserHeader';
import BlogNavigator from './BlogNavigator';
import { useEffect, useState } from 'react';
import { isTokenValid } from '../utils/auth.utils';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const valid = await isTokenValid();
      setIsAuthenticated(valid);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <View className="h-full flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="h-full flex-1 bg-gray-100 relative">
      <NavigationContainer>
        <Layout>
          <Stack.Navigator
            initialRouteName={isAuthenticated ? 'home' : 'login'}
          >
            <Stack.Screen
              name="home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="blog"
              component={BlogNavigator}
              options={{
                gestureEnabled: false,
                header: () => <UserHeader title="Blogs" />,
              }}
            />
            {/* <Stack.Screen
              name="profile"
              component={ProfileScreen}
              options={{
                headerShown: false,
              }}
            /> */}
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </Layout>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;
