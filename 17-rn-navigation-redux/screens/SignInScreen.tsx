import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Platform, StyleSheet } from 'react-native';

import LoginForm from '../components/LoginForm';
import { Text, View } from '../components/Themed';
import { AuthContext, DrawerParamList } from '../Main';
import { StackParamList } from '../navigation/StackNavigator';

export type SignInScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'SignIn'>,
  DrawerScreenProps<DrawerParamList>
>;

export default function SignInScreen({navigation, route}: SignInScreenProps ) {
  const signInComplete = useContext(AuthContext).signInComplete;
  const signUpStart = useContext(AuthContext).signUpStart;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <LoginForm onSignIn={signInComplete} onSignUp={signUpStart} />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
