import { ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import Layout from '../components/Layout';
import { isTokenValid } from '../utils/auth.utils';

// Screens
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import BlogNavigator from './BlogNavigator';
import Header from '../components/Header';
import ProfileScreen from '../screens/Profile';
import PageHeader from '../components/PageHeader'; // Adjust the path as necessary

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
            screenOptions={{
              header: ({ navigation, route }) => (
                <PageHeader
                  title={route.name.charAt(0).toUpperCase() + route.name.slice(1)}
                  onMenuToggle={() => navigation.toggleDrawer()}
                />
              ),
            }}
          >
            <Drawer.Screen name="home" component={HomeScreen} />
            <Drawer.Screen name="blog" component={BlogNavigator} />
            <Drawer.Screen name="login" component={LoginScreen} />
            <Drawer.Screen name="profile" component={ProfileScreen} />
          </Drawer.Navigator>
        </Layout>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;
