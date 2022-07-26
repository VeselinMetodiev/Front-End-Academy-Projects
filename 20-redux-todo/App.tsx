import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import ToDoContainerApp from './containers/ToDoContainerApp';
import { store } from './redux/store';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
      <View style={styles.container}>
        <ToDoContainerApp />
        <StatusBar style="auto" />
      </View>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
