import React, { Component } from "react";
import { View, StyleSheet, Pressable, Text, Animated, Button } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { questionsAPI } from "../dao/rest-api-client";
import { Question } from "../model/Question";
import AnswerComp from "./AnswerComp";

interface QuestionProps {
    question: Question;
    index: number;
    adjustScore: (score : number) => void;
    saveAnswer: (indexQuestion: number, indexAnswer: number) => void;
}

interface QuestionState {

}

export default class QuestionComp extends Component<QuestionProps, QuestionState> {

  render() {
    const question = this.props.question;
    const index = this.props.index;
    return (
        <View key={index} style={styles.questionItem}>  
        <Card style={styles.card}>
          <Card.Title title={`Question ${index + 1}`} left={undefined} />
          <Card.Content>
            <Title>Points Number: {question.pointsNumber}</Title>
            <Paragraph>{question.text}</Paragraph>
          </Card.Content>
          <Card.Cover
            style={styles.avatars}
            source={{ uri: question.imageURI }}
          />
          {question.answers.map((answer, indexAnswers) => (
            <View key={indexAnswers}>
              <AnswerComp answer={answer} indexAnswers={indexAnswers} indexQuestion={index} saveAnswer={this.props.saveAnswer} adjustScore={this.props.adjustScore}></AnswerComp>
            </View>
          ))}
        </Card>
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
