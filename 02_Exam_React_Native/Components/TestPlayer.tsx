import React, { Component } from "react";
import { View, StyleSheet, Pressable, Text, Animated, Button } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { Answer } from "../model/Answer";
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

export default class TestPlayer extends Component<TestProps, TestState> {
  state: Readonly<TestState> = {
    currentQuestionIndex: 0,
    totalPercentageScore: 0,
    selectedAnswers: new Array<number[]>(this.props.questions.length).fill(
      [],
      0,
      this.props.questions.length
    ),
  }

  constructor(props: TestProps) {
    super(props);
  }

  adjustScore = (score: number) => {
    this.setState({
      totalPercentageScore: this.state.totalPercentageScore + score,
    });
   this.setState({
      currentQuestionIndex: this.state.currentQuestionIndex + 1,
    });
  };

  saveAnswer = (questionIndex: number, selectedAnswerIndex: number) => {
    //this.setState({answers: this.state.answers.concat(`You have answered '${text}' which gives you ${score} points`)})
    this.setState(({ selectedAnswers }) => {
      const result = {
        selectedAnswers: selectedAnswers.map((selectedAnswer, index) => {
          console.log("index: ", selectedAnswer, index);
          if (!selectedAnswer.includes(selectedAnswerIndex) && index === questionIndex) {
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
  };

  handleSubmit = () => {
      this.props.onSubmit(this.state.totalPercentageScore, this.state.selectedAnswers);
  }

  render() {
    return ( <View> 
      <Text>{JSON.stringify(this.state.selectedAnswers)}</Text>
      { this.props.questions.map((question, index) => (
     <QuestionComp key={index} question={question} index={index} adjustScore={this.adjustScore} saveAnswer={this.saveAnswer}></QuestionComp>
  ))}
  <Button title='submit' onPress={this.handleSubmit}/>
  </View>
    )
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
