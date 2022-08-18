import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function RegistrationForm() {
  const [currency, setCurrency] = useState("Other");
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}> Registration Form </Text>
      <View>
        <TextInput  placeholder="First Name" style={styles.input}/>
        <TextInput placeholder="Last Name" style={styles.input}/>
        <TextInput placeholder="UserName" style={styles.input}/>
        <TextInput secureTextEntry={true} placeholder="Password" style={styles.input}/>
        <TextInput placeholder="Picture URL" style={styles.input}/>
        <TextInput placeholder="Description" style={styles.input}/>
        <Text style={styles.gender}>Gender</Text>
        <View style={{ borderWidth: 1, borderColor: 'red', borderRadius: 4 }}>
        <Picker
          selectedValue={currency}
          onValueChange={(currentCurrency) => setCurrency(currentCurrency)}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
        </View>
        <Text>Selected: {currency}</Text>
        <View style={styles.buttons}>
        <Button
          onPress={() => alert("Register button pressed")}
          title="Register"
          color="#841584"
          accessibilityLabel="Submit Register"
        />
        <Button
          onPress={() => alert("Reset button pressed")}
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
  gender: {
    fontSize: 10,
    fontWeight: "200",
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
