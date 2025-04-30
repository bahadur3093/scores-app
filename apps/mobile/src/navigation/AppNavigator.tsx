import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackParamList } from '../types/App.types';
import Layout from '../components/Layout';

// Screens
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import BlogScreen from '../screens/Blog';
import CreateUser from '../screens/CreateUser';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <View className="h-full flex-1 bg-gray-100 relative">
      <NavigationContainer>
        <Layout>
          <Stack.Navigator
            initialRouteName="home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="blog" component={BlogScreen} />
            <Stack.Screen name="profile" component={ProfileScreen} />
            <Stack.Screen name="createUser" component={CreateUser} />
          </Stack.Navigator>
        </Layout>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;
