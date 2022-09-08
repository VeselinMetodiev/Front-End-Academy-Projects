import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper'
import { Answer } from '../model/Answer'
import { Question } from '../model/Question'

interface ResultsProps {
   score: number,
   questions: Question[],
   selectedAnswers: number[][],
}

interface ResultsState {

}

export default class Results extends Component<ResultsProps, ResultsState> {
  render() {
    return (
      <View>
            <Text>{`Congratulations you completed the quiz with the score: ${this.props.score}`}</Text>
        {this.props.questions.map((question, index) => (
            <View key={index} style={styles.questionItem}>
        <Card style={styles.card}>
          <Card.Title title={`Question ${index + 1}`} left={undefined} />
          <Card.Content>
            <Title>Points Number: {question.pointsNumber}</Title>
            <Paragraph>{question.text}</Paragraph>
            <Paragraph>{`You selected ${this.props.selectedAnswers[index]}`}</Paragraph>
          </Card.Content>
          </Card>
      </View>
  ))}
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