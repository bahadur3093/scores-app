import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import { store } from '../store/store';
import AppNavigator from '../navigation/AppNavigator';
import { UserProvider } from '../store/UserContext';

//Tailwind styles don't remove this
import '../global.css';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <GestureHandlerRootView className="flex-1">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <AppNavigator />
          </UserProvider>
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
