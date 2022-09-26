import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import UserList from '../components/UserList';
import { DrawerParamList } from '../model/drawer-types';
import { RootTabParamList } from '../navigation/TabNavigator';
import { fetchUsersStart } from '../redux/actions/actions';
import { RootState, useAppDispatch, useAppSelector } from '../redux/store';
import { AboutScreenProps } from './AboutScreen';

export type UserListsScreenProps<Screen extends keyof RootTabParamList> = 
  DrawerScreenProps<DrawerParamList, 'UsersList'>;

export default function UserListScreen({ navigation }: UserListsScreenProps<'UsersList'>) {


const state = useAppSelector((state: RootState) => state.users);

const users = state.users;
console.log({users});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About this App</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Stack')} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
        <UserList users={users} onUpdate={() => console.log('on Update')} onDelete={() => console.log('on Delete')} onEdit={() => console.log('on Edit')}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
