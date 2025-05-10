import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import { isTokenValid } from '../utils/auth.utils';

// Screens
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import BlogNavigator from './BlogNavigator';
import Header from '../components/Header';
import ProfileScreen from '../screens/Profile';

const Drawer = createDrawerNavigator();

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
          <Drawer.Navigator
            initialRouteName={isAuthenticated ? 'home' : 'login'}
            drawerContent={(props) => <Header {...props} />}
          >
            <Drawer.Screen name="home" component={HomeScreen} />
            <Drawer.Screen name="blogs" component={BlogNavigator} />
            <Drawer.Screen name="login" component={LoginScreen} />
            <Drawer.Screen name="profile" component={ProfileScreen} />
          </Drawer.Navigator>
        </Layout>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;
