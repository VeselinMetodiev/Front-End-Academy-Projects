import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import DrawerNavigator from './navigation/DrawerNavigator';
import { Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import Main from './components/Main';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider style={styles.container}>
        <Main colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    // paddingTop: StatusBar.currentHeight,
  },
});