import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import QuestionForm from "./Components/QuestionsForm";
import QuestionsList from "./Components/QuestionsList";
import { questionsAPI } from "./dao/rest-api-client";
import { Question } from "./model/question";
import { Optional, Point } from "./model/shared-types";

interface AppState {
  errors: string | undefined;
  questions: Question[];
  editedQuestion: Optional<Question>;
  panState: Point | undefined;
  droppedItems: number[];
}

export default class App extends Component<{}, AppState> {
  state: Readonly<AppState> = {
    errors: undefined,
    questions: [],
    editedQuestion: undefined,
    panState: undefined,
    droppedItems: [],
  };

  async componentDidMount() {
    try {
      const allquestions = await questionsAPI.findAll();
      console.log(allquestions);
      this.setState({ questions: allquestions, errors: undefined });
    } catch (err) {
      this.setState({ errors: err as string });
    }
  }

  handleUpdateQuestion(question: Question) {
    this.setState(({ questions }) => ({
      questions: questions.map((td) => (td.id === question.id ? question : td)),
    }));
  }

  handleDeleteQuestion = async (question: Question) => {
    try {
      await questionsAPI.deleteById(question.id);
      this.setState(({ questions }) => ({
        questions: questions.filter((td) => td.id !== question.id),
        errors: undefined,
      }));
    } catch (err) {
      this.setState({ errors: err as string });
    }
  };

  handleCreateQuestion = async (question: Question) => {
    try {
      if (question.id) {
        //edit question
        const updated = await questionsAPI.update(question);
        this.setState(({ questions }) => ({
          questions: questions.map((us) =>
            us.id === updated.id ? updated : us
          ),
          errors: undefined,
          editedQuestion: undefined,
        }));
      } else {
        // create question
        const created = await questionsAPI.create(question);
        this.setState(({ questions }) => ({
          questions: questions.concat(created),
          errors: undefined,
        }));
      }
    } catch (err) {
      this.setState({ errors: err as string });
    }
  };

  handleEditQuestion = (question: Question) => {
    this.setState({ editedQuestion: question });
  };

  handleDrop = (id: number) => {
    this.setState({ droppedItems: this.state.droppedItems.concat(id) });
  };

  onUp = (id: number) => {
    const index = this.state.questions.findIndex(
      (question) => question.id === id
    );
    console.log(index);
    let newArray = this.state.questions;
    if (index > 0) {
      const temp = newArray[index - 1];
      newArray[index - 1] = newArray[index];
      newArray[index] = temp;
    }
    this.setState({ questions: newArray });
  };

  onDown = (id: number) => {
    const index = this.state.questions.findIndex(
      (question) => question.id === id
    );
    console.log(index);
    let newArray = this.state.questions;
    if (index < this.state.questions.length - 1) {
      const temp = newArray[index + 1];
      newArray[index + 1] = newArray[index];
      newArray[index] = temp;
    }
    this.setState({ questions: newArray });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="green" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboarAvoidingView}
        >
          <View>
            <QuestionForm
              question={this.state.editedQuestion}
              onCreateQuestion={this.handleCreateQuestion}
            />
            <QuestionsList
              onUp={this.onUp}
              onDown={this.onDown}
              onDrop={this.handleDrop}
              questions={this.state.questions}
              onUpdate={() => console.log("update")}
              onDelete={this.handleDeleteQuestion}
              onEdit={this.handleEditQuestion}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
  },
  keyboarAvoidingView: {
    flex: 1,
  },
});
