
  import { DrawerScreenProps } from '@react-navigation/drawer';
  import React, { Dispatch, useContext, useEffect } from 'react';
  import { StyleSheet } from 'react-native';
  
  import RegistrationForm from '../components/RegistrationForm';
  import { Text, View } from '../components/Themed';
  import { AuthContext } from '../model/contexts';
import { Credentials } from '../model/credentials';
  import { DrawerParamList } from '../model/drawer-types';
  import { RootTabParamList } from '../navigation/TabNavigator';
import { UserAction, loginStart } from '../redux/actions/actions';
import { StoreState } from '../redux/reducers';

export type AddNewUserScreenProps<Screen extends keyof RootTabParamList> = 
  DrawerScreenProps<DrawerParamList, 'AddNewUser'>;
  
  export default function AddNewUserScreen({navigation, route}: AddNewUserScreenProps<'AddNewUser'> ) {
    const {signUpComplete, signInStart} = useContext(AuthContext);
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add New User</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <RegistrationForm onSignUpComplete={signUpComplete} onSignUpCancel={signInStart}/>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });
  
