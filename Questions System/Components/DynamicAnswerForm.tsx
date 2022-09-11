import React, { Component, FormEvent } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  Button,
  InputAccessoryView,
} from "react-native";
import { TextInput } from "react-native-paper";
import ImagePickerExample from "./ImagePicker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Answer } from "../model/Answer";
import { Formik } from "formik";
import * as yup from "yup"

interface DynamicFormState {
  textValue: string; // this will be attached with each input onChangeText
  numInputs: number; // our number of inputs, we can add the length or decrease
  inputs: string[];
  answers: Answer[];
  text: string;
  imageURI: string;
  scorePercentage: string;
}

interface DynamicFormProps {
  onEnteredAnswer: (answers: Answer[]) => void;
}

export default class DynamicAnswerForm extends Component<
  DynamicFormProps,
  DynamicFormState
> {
  state: Readonly<DynamicFormState> = {
    text: '',
    imageURI: '',
    scorePercentage: '',
    textValue: "",
    numInputs: 1,
    inputs: [],
    answers: [new Answer(
      '',
      '',
      '',
      '',
      '',
    )],
  };

  setInputValue = (index: number, value: string, field: string) => {
    // first, we are storing input value to refInputs array to track them
    const inputs = this.state.inputs;
    switch (field) {
      case "text":
        this.state.answers[index].text = value;
        break;
      case "imageURI":
        this.state.answers[index].imageURI = value;
        break;
      case "score":
        if (parseInt(value) || value === '') {
          this.state.answers[index].scorePercentage = value;
        } else {
          console.log('Score Percentage should be a number')
        }
        break;
    }
    inputs[index] = value;
    // we are also setting the text value to the input field onChangeText
    this.setState({ textValue: value });
  };

  addInput = () => {
    // add a new element in our refInputs array
    this.setState({ inputs: this.state.inputs.concat("") });

    this.setState({
      answers: this.state.answers.concat(
        new Answer(
          '',
          '',
          '',
          '',
          '',
        ))
    });


    // increase the number of inputs
    this.setState({ numInputs: this.state.numInputs + 1 });
  };

  removeInput = (i: number) => {
    // remove from the array by index value
    this.setState({
      inputs: this.state.inputs.filter((value, index) => index !== i),
    });
    this.setState({
      answers: this.state.answers.filter((value, index) => index !== i),
    });
    // decrease the number of inputs
    this.setState({ numInputs: this.state.numInputs - 1 });
  };

  // handleSetImage = (imageURL: string) => {
  //   // add a new element in our refInputs array
  //   this.setState({ inputs: this.state.inputs.concat(imageURL) });
  //   // increase the number of inputs
  //   this.setState({ numInputs: this.state.numInputs + 1 });
  //   // this.props.onEnteredAnswer(imageURL);
  // };

  handleAnswersSubmit = () => {
    this.setState({ textValue: "", numInputs: 1, inputs: [], answers: [] });
    this.props.onEnteredAnswer(this.state.answers);
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{
            text: this.state.text,
            scorePercentage: this.state.scorePercentage,
            imageURI: this.state.imageURI,
          }}
          onSubmit={(values) => console.log(JSON.stringify(values))}
          validationSchema={yup.object().shape({
            text: yup.string().min(10).max(150),
            imageURL: yup.string().url(),
            scorePercentage: yup.number(),
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            resetForm,
          }) => (
            <View>
              {this.state.inputs.map((input, i) =>
                <View key={i} style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text>{i + 1}.</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(value) => { this.setInputValue(i, value, "text"); handleChange("text") }}
                    value={this.state.answers[i] ? this.state.answers[i].text : ''}
                    placeholder="Text"
                    onBlur={() => setFieldTouched("text")}
                  />
                  {touched.text && errors.text && (
                    <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                      {errors.text}
                    </Text>
                  )}
                  <TextInput
                    style={styles.input}
                    onChangeText={(value) => { this.setInputValue(i, value, "imageURI"); handleChange('imageURI') }}
                    value={this.state.answers[i] ? this.state.answers[i].imageURI : ''}
                    placeholder="Image URL"
                    onBlur={() => setFieldTouched("imageURI")}
                  />
                  {touched.imageURI && errors.imageURI && (
                    <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                      {errors.text}
                    </Text>
                  )}
                  <TextInput
                    style={styles.input}
                    onChangeText={(value) => this.setInputValue(i, value, "score")}
                    value={this.state.answers[i] ? this.state.answers[i].scorePercentage : ''}
                    placeholder="Score percentage"
                    onBlur={() => setFieldTouched("scorePercentage")}
                  />
                  {touched.scorePercentage && errors.scorePercentage && (
                    <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                      {errors.text}
                    </Text>
                  )}
                  {/* To remove the input */}
                  <Pressable
                    onPress={() => this.removeInput(i)}
                    style={{ marginLeft: 5 }}
                  >
                    <Button
                      onPress={() => this.removeInput(i)}
                      title={""}
                      color="red"
                    />
                  </Pressable>
                  {/* { <ImagePickerExample onSubmit={this.handleSetImage} /> } */}
                </View>
              )}
              </View>
          )}
          </Formik>
          <Pressable onPress={this.addInput} style={styles.addButton}>
            <Text style={{ color: "orange", fontWeight: "bold" }}>
              + Add a new answer
            </Text>
          </Pressable>
          <View style={styles.buttons}>
            <FontAwesome.Button
              color="#841584"
              onPress={() => {
                this.handleAnswersSubmit();
              }}
              accessibilityLabel="Submit question"
              name={"envelope"}
              size={40}
            >
              Submit Answers
            </FontAwesome.Button>
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
  },
  buttons: {
    fontSize: 45,
    marginTop: 20,
    marginBottom: 30,
    flexDirection: "row",
    gap: 10,
  },
  addButton: {},
  answer: {},
  input: {
    borderColor: "#6E85B7",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    padding: 12,
    width: 300,
  },
});
