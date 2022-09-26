import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Main from './navigation/Main';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
        <Main />
        <StatusBar />
        </Provider>
      </SafeAreaProvider>
    );
  }
}
