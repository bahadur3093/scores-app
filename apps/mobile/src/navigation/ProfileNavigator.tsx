import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileScreen from '../screens/Profile';
import UserPosts from '../screens/UserPosts';
import ProfileNavBar from '../components/ProfileNavBar';

export type ProfileStackParamList = {
  home: undefined;
  userPosts: undefined;
  tab2: undefined;
  tab3: undefined;
};

const Tab = createBottomTabNavigator<ProfileStackParamList>();


const ProfileNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
      tabBar={({ navigation }) => <ProfileNavBar navigation={navigation} />}
      initialRouteName="home"
    >
      <Tab.Screen name="home" component={ProfileScreen} />
      <Tab.Screen name="userPosts" component={UserPosts} />
      <Tab.Screen name="tab2" component={UserPosts} />
      <Tab.Screen name="tab3" component={UserPosts} />
    </Tab.Navigator>
  );
};

export default ProfileNavigator;
