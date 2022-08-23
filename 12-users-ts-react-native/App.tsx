import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import TurboButton from "./builders/TurboButton";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import UserList from "./components/UserList";
import { UsersAPI } from "./dao/rest-api-client";
import { FilterType, Optional } from "./model/shared-types";
import { User } from "./model/user.model";

export enum Views {
  Registration = 1, Login, InApp
}

interface UserAppState {
  users: User[];
  editedUser: Optional<User>;
  filter: FilterType;
  errors: string | undefined;
  activeView: Views;
}

export default class App extends Component<{}, UserAppState> {
  state: Readonly<UserAppState> = {
    users: [],
    editedUser: undefined,
    filter: undefined,
    activeView: Views.Registration,
    errors: undefined,
  };

  constructor(props: {}) {
    super(props);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  async componentDidMount() {
    try {
      const allUsers = await UsersAPI.findAll();
      this.setState({ users: allUsers, errors: undefined });
    } catch (err) {
      this.setState({ errors: err as string });
    }
  }

  handleUpdateUser(user: User) {
    this.setState(({ users }) => ({
      users: users.map((td) => (td.id === user.id ? user : td)),
    }));
  }

  handleDeleteUser = async (user: User) => {
    try {
      await UsersAPI.deleteById(user.id);
      this.setState(({ users }) => ({
        users: users.filter((td) => td.id !== user.id),
        errors: undefined,
      }));
    } catch (err) {
      this.setState({ errors: err as string });
    }
  };

  handleCreateUser = async (user: User) => {
    try {
      if (user.id) {
        //edit user
        const updated = await UsersAPI.update(user);
        this.setState(({ users }) => ({
          users: users.map((us) => (us.id === updated.id ? updated : us)),
          errors: undefined,
          editedUser: undefined,
        }));
      } else {
        // create user
        const created = await UsersAPI.create(user);
        this.setState(({ users }) => ({
          users: users.concat(created),
          errors: undefined,
          activeView: Views.InApp,
        }));
      }
    } catch (err) {
      this.setState({ errors: err as string });
    }
  };

  handleEditUser = (user: User) => {
    this.setState({ editedUser: user });
  };


  handleFilterChange = (status: FilterType) => {
    this.setState({ filter: status });
  };

  handleViewChange = () => {
    this.setState(({ activeView }) => ({
      activeView: activeView === Views.Registration ? Views.Login : Views.Registration
    }));
  }

  handleInAppView= () => {
    this.setState({ activeView : Views.InApp})
  }

  handleLoginView = () => {
    this.setState({ activeView : Views.Login})
  }

  handleRegistrationView = () => {
    this.setState({ activeView : Views.Registration})
  }

  render() {
    return (
      <View style={styles.container}>
        {(() => {
          switch (this.state.activeView) {
            case Views.Registration:
              return (
                <ScrollView>
                  <RegistrationForm
                    key={this.state.editedUser?.id}
                    user={this.state.editedUser}
                    onCreateUser={this.handleCreateUser}
                    onLoginUser={this.handleLoginView}
                  />
                  </ScrollView>
                );
            case Views.Login:
              return (
                <LoginForm onRegUser={this.handleRegistrationView} onLoginUser={this.handleInAppView}/>);
            case Views.InApp:
              return (
                <View>
                <TurboButton textSize={32} buttonSize={100} backgroundColor="green" color="white" onPress={this.handleViewChange}>Log out</TurboButton>
                <UserList
                users={this.state.users}
                filter={this.state.filter}
                onUpdate={this.handleUpdateUser}
                onDelete={this.handleDeleteUser}
                onEdit={this.handleEditUser}
              />
              </View>
        )}
        })()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 40,
    backgroundColor: "#F7ECDE",
  },
  errors: {
    padding: 5,
    border: 1,
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: "#eecccc",
    color: "red",
    textAlign: "center",
  },
  app: {},
});