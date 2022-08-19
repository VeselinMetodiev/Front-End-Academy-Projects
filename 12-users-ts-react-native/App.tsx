import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import UserList from './components/UserList';
import { UsersAPI } from './dao/rest-api-client';
import { FilterType, Optional } from './model/shared-types';
import { User } from './model/user.model';

interface UserAppState {
  users: User[];
  editedUser: Optional<User>,
  filter: FilterType;
  errors: string | undefined;
}

export default class App extends Component<{}, UserAppState> {
  state: Readonly<UserAppState> = {
    users: [],
    editedUser: undefined,
    filter: undefined,
    errors: undefined
  }

  constructor(props: {}) {
    super(props)
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  async componentDidMount() {
    try {
      const allUsers = await UsersAPI.findAll();
      this.setState({ users: allUsers, errors: undefined })
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleUpdateUser(user: User) {
    this.setState(({ users }) => ({
      users: users.map(td => td.id === user.id ? user : td)
    }))
  }

  handleDeleteUser = async (user: User) => {
    try {
      await UsersAPI.deleteById(user.id);
      this.setState(({ users }) => ({
        users: users.filter(td => td.id !== user.id),
        errors: undefined
      }));
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleCreateUser = async (user: User) => {
    try {
      if (user.id) { //edit user
        const updated = await UsersAPI.update(user);
        this.setState(({ users }) => ({
          users: users.map(us => us.id === updated.id ? updated : us),
          errors: undefined,
          editedUser: undefined
        }))
      } else { // create user
        const created = await UsersAPI.create(user);
        this.setState(({ users }) => ({
          users: users.concat(created),
          errors: undefined
        }));
      }
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleEditUser = (user: User) => {
    this.setState({ editedUser: user });
  }

  handleFilterChange = (status: FilterType) => {
    this.setState({ filter: status })
  }


  render(){
  return (
    <View style={styles.container}>
    <RegistrationForm/>
    <UserList users={this.state.users} filter={this.state.filter} onUpdate={this.handleUpdateUser} onDelete={this.handleDeleteUser} onEdit={this.handleEditUser}/>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});