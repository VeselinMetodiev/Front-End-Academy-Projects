import React, { Component, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Views } from "../../App";
import { UsersAPI } from "../../dao/rest-api-client";
import { AppStateListener, Optional } from "../../model/shared-types";
import { User } from "../../model/user.model";

interface UserInputProps {
  onLoginUser: AppStateListener
  onRegUser: AppStateListener
}

interface UserInputState {
  username: string;
  password: string;
  lastModificationTimespan: string;
}


export default class LoginForm extends Component<UserInputProps, UserInputState> {
  state: Readonly<UserInputState> = {
    username: '',
    password: '',
    lastModificationTimespan: new Date().toDateString()
  }

  handleSignUp = async () => {
    console.log(this.state.username + ' ' + this.state.password)
    const allUsers = await UsersAPI.findAll();
    let currentUser = undefined;
    allUsers.forEach((user) => {
      if (user.username === this.state.username && user.password === this.state.password){
        currentUser = user;
      }
    })
    if(currentUser){
      this.props.onLoginUser(Views.InApp);
      console.log('Such user exists')
    } else {
      console.log("Such user does not exist.")
    }
  }
  goToReg = () => {
    this.props.onRegUser(Views.Registration);
  }

  handleFieldChanged(field: string, text: string) {
    const stateUpdate = { [field]: text } as unknown as UserInputState;
    this.setState(stateUpdate);
  }

  render() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}> Login Form </Text>
      <View>
        <TextInput onChangeText={this.handleFieldChanged.bind(this, 'username')} placeholder="Username" style={styles.input}/>
        <TextInput onChangeText={this.handleFieldChanged.bind(this, 'password')} secureTextEntry={true} placeholder="Password" style={styles.input}/>
        <View style={styles.buttons}>
        <Button
          onPress={this.handleSignUp}
          title="Login"
          color="#542867"
          accessibilityLabel="Sign up"
        />
        <Button
          onPress={() => alert("Reset button pressed")}
          title="Reset"
          color="#842317"
          accessibilityLabel="Reset Form"
        />
         <Button
          onPress={this.goToReg}
          title="Register"
          color="#841584"
          accessibilityLabel="Submit Register"
        />
    
        </View>
      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B2C8DF",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    height: 40,
    width: 200,
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
  buttons: {
    fontSize: 45,
    marginTop: 20,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
},
});