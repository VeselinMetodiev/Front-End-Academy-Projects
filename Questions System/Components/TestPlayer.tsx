import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Animated,
  Button,
  ScrollView,
} from "react-native";
import { Question } from "../model/Question";
import QuestionComp from "./QuestionComp";

interface TestProps {
  questions: Question[];
  onSubmit: (score: number, answers: number[][]) => void;
}

interface TestState {
  currentQuestionIndex: number;
  totalPercentageScore: number;
  selectedAnswers: number[][]; //Contains index of question and index of answers that were selected
}

let STORAGE_KEY = "@user_input";

export default class TestPlayer extends Component<TestProps, TestState> {
  state: Readonly<TestState> = {
    currentQuestionIndex: 0,
    totalPercentageScore: 0,
    selectedAnswers: new Array<number[]>(this.props.questions.length).fill(
      [],
      0,
      this.props.questions.length
    ),
  };

  constructor(props: TestProps) {
    super(props);
  }

  //Methods for async storage

  componentDidMount() {
    this.readData();
  }

  saveData = async (answers: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, answers);
      alert("Data successfully saved. Data: " + answers);
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  };

  readData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        this.setState({ selectedAnswers: JSON.parse(value) });
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };

  clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert("Storage successfully cleared!");
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };

  onSubmitEditing = (value: string) => {
    if (!this.state.selectedAnswers) return;
    this.saveData(value);
  };

  //
  adjustScore = (score: number) => {
    this.setState({
      totalPercentageScore: this.state.totalPercentageScore + score,
    });
    this.setState({
      currentQuestionIndex: this.state.currentQuestionIndex + 1,
    });
  };

  saveAnswer = (questionIndex: number, selectedAnswerIndex: number) => {
    this.setState(({ selectedAnswers }) => {
      const result = {
        selectedAnswers: selectedAnswers.map((selectedAnswer, index) => {
          if (
            !selectedAnswer.includes(selectedAnswerIndex) &&
            index === questionIndex
          ) {
            const selectedAnswerCopy = selectedAnswer.slice();
            selectedAnswerCopy.push(selectedAnswerIndex);
            selectedAnswerCopy.sort();
            return selectedAnswerCopy;
          } else {
            return selectedAnswer;
          }
        }),
      };
      return result;
    });
    this.onSubmitEditing(JSON.stringify(this.state.selectedAnswers));
  };

  handleSubmit = () => {
    this.props.onSubmit(
      this.state.totalPercentageScore,
      this.state.selectedAnswers
    );
    this.clearStorage();
  };

  render() {
    return (
      <ScrollView>
        <Text>{JSON.stringify(this.state.selectedAnswers)}</Text>
        {this.props.questions.map((question, index) => (
          <QuestionComp
            selectedAnswers={this.state.selectedAnswers}
            key={index}
            question={question}
            index={index}
            adjustScore={this.adjustScore}
            saveAnswer={this.saveAnswer}
          ></QuestionComp>
        ))}
        <Button title="submit" onPress={this.handleSubmit} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  questionItem: {
    flex: 1,
    gap: 15,
    padding: 15,
    border: 10,
  },
  card: {
    borderWidth: 1,
  },
  questionItemRight: {
    flexDirection: "row",
    gap: 15,
    padding: 0,
    border: 1,
  },
  questionItemStatus: {
    fontSize: 24,
  },
  button: {
    padding: 0,
    width: 50,
    height: 40,
  },
  avatars: {
    width: 200,
    height: 200,
  },
});


