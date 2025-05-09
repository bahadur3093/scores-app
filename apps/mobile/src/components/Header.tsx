import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/App.types';

const Header = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View className="mb-6 w-2/5 bg-white shadow-lg flex-row justify-around items-center h-12 border-t border-gray-200 rounded-3xl">
      {/* <TouchableOpacity
        className="flex items-center"
        onPress={() => navigation.navigate('home')}
      >
        <Ionicons name="home" size={24} color="black" />
      </TouchableOpacity> */}

      <TouchableOpacity
        className="flex items-center"
        onPress={() => navigation.navigate('login')}
      >
        <Ionicons name="book" size={24} color="black" />
      </TouchableOpacity>

      {/* <TouchableOpacity
        className="flex items-center"
        onPress={() => navigation.navigate('login')}
      >
        <Ionicons name="person" size={24} color="black" />
      </TouchableOpacity> */}
    </View>
  );
};

export default Header;
