import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackParamList } from '../types/App.types';
import Layout from '../components/Layout';

// Screens
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import CreateUser from '../screens/CreateUser';
import RegisterScreen from '../screens/Register';
import LoginScreen from '../screens/Login';
import UserHeader from '../components/UserHeader';
import BlogNavigator from './BlogNavigator';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <View className="h-full flex-1 bg-gray-100 relative">
      <NavigationContainer>
        <Layout>
          <Stack.Navigator initialRouteName="login">
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
            <Stack.Screen
              name="profile"
              component={ProfileScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="createUser"
              component={CreateUser}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="register"
              component={RegisterScreen}
              options={{
                headerShown: false,
              }}
            />
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
