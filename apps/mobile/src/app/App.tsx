import { SafeAreaView, Text, StatusBar, View } from 'react-native';
import '../global.css';

export const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View className="flex-1 justify-center items-center bg-white">
          <Text className="text-red-500 text-xl font-bold">Hello</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
