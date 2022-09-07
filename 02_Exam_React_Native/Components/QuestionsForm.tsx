import React, { Component } from "react";
import { Button, TextInput, View, Text, StyleSheet, ScrollView } from "react-native";
import {
  IdType,
  QuestionListener,
  Optional,
  QuestionTypes,
} from "../model/shared-types";
import * as yup from "yup";
import { Formik } from "formik";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Answer } from "../model/Answer";
import { Question } from "../model/Question";
import ImagePickerExample from "./ImagePicker";
import DynamicForm from "./DynamicAnswerForm";

interface QuestionsFormProps {
  question: Optional<Question>;
  onCreateQuestion: QuestionListener;
}

interface QuestionsFormState {
  text: string;
  pointsNumber: number;
  answers: Answer[];
  imageURI: string;
  dateCreated: string;
  dateModified: string | undefined;
  type: QuestionTypes;
  id: string;
}

export default class QuestionForm extends Component<
  QuestionsFormProps,
  QuestionsFormState
> {
  state: Readonly<QuestionsFormState> = {
    text: this.props.question?.text || "",
    pointsNumber: this.props.question?.pointsNumber || 0,
    imageURI: this.props.question?.imageURI || "",
    dateCreated: this.props.question?.dateCreated || new Date().toDateString(),
    dateModified: this.props.question?.dateModified || undefined,
    type: this.props.question?.type || QuestionTypes.MultipleChoice,
    answers: this.props.question?.answers || [],
    id: this.props.question?.id?.toString() || "",
  };

  renderError = (message: string) => {
    return <Text>{message}</Text>;
  };
  setDate: any;

  handleFieldChanged(field: string, text: string) {
    const stateUpdate = { [field]: text } as unknown as QuestionsFormState;
    this.setState(stateUpdate);
  }

  handleQuestionReset = () => {
    this.setState({
      text: "",
      pointsNumber: 0,
      imageURI: "",
      type: QuestionTypes.MultipleChoice,
      answers: [],
    });
  };

  handleQuestionSubmit = (values: Partial<Question>) => {
    this.props.onCreateQuestion(
      new Question(
        values.text!,
        values.pointsNumber!,
        this.state.answers,
        this.state.imageURI ? this.state.imageURI : values.imageURI!,
        new Date().toDateString(),
        "",
        this.state.type!,
        this.state.id ? parseInt(this.state.id) : undefined
      )
    );
    this.setState({
      text: "",
      pointsNumber: 0,
      imageURI: "",
      type: QuestionTypes.MultipleChoice,
      answers: [],
    });
  };

  handleSetImage = (imageURL: string) => {
    this.setState({ imageURI: imageURL });
  };

  addAnswer = (answers: Answer[]) => {
    this.setState({ answers: this.state.answers.concat(answers) });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.registrationForm}>
          <Text style={styles.titleText}> Add a new question: </Text>
          <Formik
            initialValues={{
              text: this.state.text,
              pointsNumber: this.state.pointsNumber,
              imageURI: this.state.imageURI,
              type: this.state.type,
              answers: this.state.answers,
            }}
            onSubmit={(values) => console.log(JSON.stringify(values))}
            validationSchema={yup.object().shape({
              text: yup.string().min(2).max(150),
              pointsNumber: yup.number(),
              authorName: yup.string().min(3).max(40),
              type: yup.string().matches(/Multiple Choice | Drag and Drop | Multiple Response/)
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
              <ScrollView contentContainerStyle={styles.registrationForm}>
                <TextInput
                  value={values.text}
                  style={styles.input}
                  onChangeText={handleChange("text")}
                  onBlur={() => setFieldTouched("text")}
                  placeholder="Question:"
                />
                {touched.text && errors.text && (
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                    {errors.text}
                  </Text>
                )}
                <TextInput
                  value={values.pointsNumber.toString()}
                  style={styles.input}
                  onChangeText={handleChange("pointsNumber")}
                  onBlur={() => setFieldTouched("pointsNumber")}
                  placeholder="pointsNumber"
                />
                {touched.pointsNumber && errors.pointsNumber && (
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                    {errors.pointsNumber}
                  </Text>
                )}
                <TextInput
                  value={QuestionTypes[values.type]}
                  style={styles.input}
                  onChangeText={handleChange("type")}
                  placeholder="Type"
                  onBlur={() => setFieldTouched("type")}
                />
                {touched.type && errors.type && (
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                    {errors.imageURI}
                  </Text>
                )}
                <TextInput
                  value={values.imageURI}
                  style={styles.input}
                  onChangeText={handleChange("imageURI")}
                  placeholder="image URL"
                  onBlur={() => setFieldTouched("imageURI")}
                />
                {touched.imageURI && errors.imageURI && (
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                    {errors.imageURI}
                  </Text>
                )}
                <ImagePickerExample onSubmit={this.handleSetImage} />
                <Text style={styles.textAnswers}>Answers</Text>
                <DynamicForm onEnteredAnswer={this.addAnswer} />
                <View style={styles.buttons}>
                  <FontAwesome.Button
                    color="#841584"
                   // disabled={!isValid}
                    onPress={() => {
                      this.handleQuestionSubmit(values);
                      resetForm();
                    }}
                    accessibilityLabel="Submit question"
                    name={"envelope"}
                    size={40}
                  >
                    Submit
                  </FontAwesome.Button>
                  <FontAwesome.Button
                    onPress={() => {
                      this.handleQuestionReset;
                      resetForm();
                    }}
                    color="#842317"
                    accessibilityLabel="Reset Form"
                    name="resistance"
                    size={40}
                  >
                    Reset
                  </FontAwesome.Button>
                </View>
              </ScrollView>
            )}
          </Formik>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#B2C8DF",
    borderRadius: 10,
    paddingTop: 20,
    //padding: 140,
  },
  registrationForm: {
    alignItems: "center",
    paddingBottom: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    borderColor: "#6E85B7",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    padding: 12,
    width: 300,
  },
  buttons: {
    fontSize: 45,
    marginTop: 20,
    marginBottom: 30,
    flexDirection: "row",
    gap: 10,
  },
  textAnswers: {
    fontSize: 20,
    margin: 20,
  },
});
