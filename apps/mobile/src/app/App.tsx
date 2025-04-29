import {
  SafeAreaView,
  Text,
  StatusBar,
} from 'react-native';
export const App = () => {

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <Text>Welcome  I start building now </Text>
      </SafeAreaView>
    </>
  );
};

export default App;
