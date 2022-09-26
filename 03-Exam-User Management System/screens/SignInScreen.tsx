import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { Dispatch, useContext, useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import LoginForm, { Credentials } from '../components/LoginForm';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../model/contexts';
import { DrawerParamList } from '../model/drawer-types';
import { StackParamList } from '../navigation/StackNavigator';
import { loginStart, signUpStart, UserAction } from '../redux/actions/actions';
import { StoreState } from '../redux/reducers';
import { useAppSelector, RootState } from '../redux/store';

export type SignInScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'SignIn'>,
  DrawerScreenProps<DrawerParamList>
>;

interface SignInCustomProps {
  onSignInSubmit: (credentials: Credentials) => void,
  onSignUp: () => void,
}

function mapDispatchToProps(dispatch: Dispatch<UserAction>) {
  return {
      onSignInSubmit: (credentials: Credentials) => dispatch(loginStart(credentials)),
      onSignUp: () => {},
  }
}

function mapStateToProps(state : StoreState) {
  return {
      
  }
}



function SignInScreen({navigation, route, onSignInSubmit, onSignUp}: SignInScreenProps & SignInCustomProps) {

  const isLoggedUser = useAppSelector((state: RootState) => state.users.loggedUser?.auth);

  
  
  useEffect(() => {
   if(isLoggedUser){
      navigation.navigate('UsersList');
   }
  }, [isLoggedUser])
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <LoginForm onSignInSubmit={onSignInSubmit} onSignUp={onSignUp} />
    </View>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 50,
  },
});
