import React, { Component } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper'
import { Question } from '../model/Question';

interface TestProps {
    questions: Question[];
}

export default class Test extends Component<TestProps, {}> {
  render() {
    return (
        <View>
        {this.props.questions.map((question, index) => 
        <View style={styles.questionItem}>
        <Card style={styles.card}>
      <Card.Title title={`Question ${index+1}`} left={undefined} />
      <Card.Content>
        <Title>Points Number: {question.pointsNumber}</Title>
        <Paragraph>{question.text}</Paragraph>
      </Card.Content>
      <Card.Cover style={styles.avatars} source={{ uri: question.imageURI }} />
      {question.answers.map((answer, index) => 
      <Pressable>
      <Card.Content>
      <Title>{`Answer ${index}`}</Title>
      <Paragraph>{answer}</Paragraph>
    </Card.Content>
    </Pressable>
        )}
        </Card>
      </View>
    )
  }
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
