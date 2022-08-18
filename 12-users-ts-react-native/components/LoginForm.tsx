import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function RegistrationForm() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}> Login Form </Text>
      <View>
        <TextInput placeholder="UserName" style={styles.input}/>
        <TextInput secureTextEntry={true} placeholder="Password" style={styles.input}/>
        <View style={styles.buttons}>
        <Button
          onPress={() => alert("Main button pressed")}
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
          onPress={() => alert("Register button pressed")}
          title="Register"
          color="#841584"
          accessibilityLabel="Submit Register"
        />
    
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
