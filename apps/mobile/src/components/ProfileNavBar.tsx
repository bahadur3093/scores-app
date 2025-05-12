import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { ProfileStackParamList } from '../navigation/ProfileNavigator';

interface IProfileNavBar {
  navigation: NativeStackNavigationProp<ProfileStackParamList>;
}

const routes: { name: keyof ProfileStackParamList; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { name: 'home', label: 'Home', icon: 'home' },
  { name: 'userPosts', label: 'Posts', icon: 'document-text' },
  { name: 'tab2', label: 'Tab 2', icon: 'document-text' },
  { name: 'tab3', label: 'Tab 3', icon: 'document-text' },
];

const ProfileNavBar = ({ navigation }: IProfileNavBar) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('home');

  const handleNavigate = (screen: keyof ProfileStackParamList) => {
    setActiveTab(screen);
    navigation.navigate(screen);
  };

  return (
    <View
      className="flex-row justify-around items-center bg-gray-200 py-3"
      style={{ paddingBottom: insets.bottom }}
    >
      {routes.map((route) => (
        <TouchableOpacity
          key={route.name}
          className={`flex-row items-center px-4 py-2 rounded-full ${
            activeTab === route.name ? 'bg-[#3A59D1]' : ''
          }`}
          onPress={() => handleNavigate(route.name as keyof ProfileStackParamList)}
        >
          <Ionicons
            name={route.icon}
            size={24}
            color={activeTab === route.name ? 'white' : '#3A59D1'}
          />
          {activeTab === route.name && (
            <Text
              className="ml-2 text-sm font-semibold text-white"
            >
              {route.label}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProfileNavBar;
