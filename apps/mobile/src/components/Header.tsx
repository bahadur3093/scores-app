import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/App.types';

const Header = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View className="flex-column">
      <TouchableOpacity
        className="flex items-center flex-row bg-white p-2"
        onPress={() => console.log('home')}
      >
        <Ionicons name="book" size={24} color="black" className="mr-2" />
        <Text>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex items-center flex-row bg-white p-2"
        onPress={() => console.log('profile')}
      >
        <Ionicons name="book" size={24} color="black" className="mr-2" />
        <Text>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex items-center flex-row bg-white p-2"
        onPress={() => navigation.navigate('login')}
      >
        <Ionicons name="book" size={24} color="black" className="mr-2" />
        <Text>Blog</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
