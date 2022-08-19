import { Picker } from "@react-native-picker/picker";
import React, { Component, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { ApplicationState, AppStateListener, Optional, UserListener } from "../model/shared-types";
import { User, UserRole, UserStatus } from "../model/user.model";

interface UserInputProps {
  user: Optional<User>;
  onCreateUser: UserListener
  onLoginUser: AppStateListener
}

interface UserInputState {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  userRole: UserRole;
  gender: string;
  pictureUrl: string;
  description: string;
  userStatus: UserStatus;
  registrationTimespan: string;
  lastModificationTimespan: string;
}

export default class RegistrationForm extends Component<UserInputProps, UserInputState> {
  state: Readonly<UserInputState> = {
    id: this.props.user?.id?.toString() ||'',
    firstName: this.props.user?.firstName ||'',
    lastName: this.props.user?.lastName ||'',
    username: this.props.user?.username ||'',
    password: this.props.user?.password ||'',
    gender: this.props.user?.gender || '',
    userRole: this.props.user?.userRole ||UserRole.USER,
    pictureUrl: this.props.user?.pictureUrl ||'',
    description: this.props.user?.description ||'',
    userStatus: this.props.user?.status || UserStatus.ACTIVE,
    registrationTimespan: this.props.user?.registrationTimestamp || new Date().toDateString(),
    lastModificationTimespan: this.props.user?.lastModificationTimestamp || new Date().toDateString()
}

handleUserSubmit = () => {
  this.props.onCreateUser(new User(
      this.state.firstName,
      this.state.lastName,
      this.state.username,
      this.state.password,
      this.state.gender,
      this.state.userRole,
      this.state.pictureUrl,
      this.state.description,
      this.state.userStatus,
      this.state.registrationTimespan,
      this.state.lastModificationTimespan,
      this.state.id ? parseInt(this.state.id) : undefined));
      this.setState({firstName: '', lastName: '', username: '', password: '', gender: '', pictureUrl: '', description: ''})
}

handleFieldChanged(field: string, text: string) {
  const stateUpdate = { [field]: text } as unknown as UserInputState;
  this.setState(stateUpdate);
}

  handleUserReset = () => {
      this.setState({firstName: '', lastName: '', username: '', password: '', gender: '', pictureUrl: '', description: ''})
  }

  handleUserLogin = (event: React.FormEvent) => {
      event.preventDefault(); //if none - it will reload the page
      console.log("Changing State");
      this.props.onLoginUser(ApplicationState.Login);
      }

render() {
  return (
    <View>
      <View style={styles.registrationForm}>
      <Text style={styles.titleText}> Registration Form </Text>
        <TextInput onChangeText={this.handleFieldChanged.bind(this, 'firstName')} value={this.state.firstName} placeholder="First Name" style={styles.input}/>
        <TextInput onChangeText={this.handleFieldChanged.bind(this, 'lastName')} value={this.state.lastName} placeholder="Last Name" style={styles.input}/>
        <TextInput onChangeText={this.handleFieldChanged.bind(this, 'username')} value={this.state.username} placeholder="Username" style={styles.input}/>
        <TextInput onChangeText={this.handleFieldChanged.bind(this, 'password')} value={this.state.password} secureTextEntry={true} placeholder="Password" style={styles.input}/>
        <TextInput onChangeText={this.handleFieldChanged.bind(this, 'pictureUrl')} value={this.state.pictureUrl} placeholder="Picture URL" style={styles.input}/>
        <TextInput onChangeText={this.handleFieldChanged.bind(this, 'description')} value={this.state.description} placeholder="Description" style={styles.input}/>
        <Text style={styles.gender}>Gender</Text>
        <View style={{ borderWidth: 1, borderColor: 'red', borderRadius: 4 }}>
        <Picker
          selectedValue={this.state.gender}
          onValueChange={this.handleFieldChanged.bind(this, 'gender')}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
        </View>
        <Text>Selected: {this.state.gender}</Text>
        <View style={styles.buttons}>
        <Button
          onPress={this.handleUserSubmit}
          title="Register"
          color="#841584"
          accessibilityLabel="Submit Register"
        />
        <Button
          onPress={this.handleUserReset}
          title="Reset"
          color="#842317"
          accessibilityLabel="Reset Form"
        />
        <Button
          onPress={() => alert("Main button pressed")}
          title="Main"
          color="#542867"
          accessibilityLabel="Back to Login form"
        />
        </View>
      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  registrationForm: {
    width: "85%",
    backgroundColor: "#B2C8DF",
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: "center",
    paddingHorizontal: 100,
    marginTop: 50,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  gender: {
    fontSize: 14,
    fontWeight: "400",
  },
  input: {
    borderColor: "#6E85B7",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 5,
    padding: 5,
    width: 250,
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
