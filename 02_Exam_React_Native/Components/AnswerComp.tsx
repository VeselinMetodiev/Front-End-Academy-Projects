import React, { Component } from 'react'
import { Animated, Pressable, View, StyleSheet } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { Answer } from '../model/Answer';

interface AnswerProps {
  answer: Answer;
  indexQuestion: number;
  indexAnswers: number;
  adjustScore: (score : number) => void;
  saveAnswer: (indexQuestion: number, indexAnswer: number) => void;

}

interface AnswerState {
  colorAnim: Animated.Value;
}

export default class AnswerComp extends Component<AnswerProps, AnswerState> {
  state: Readonly<AnswerState> = {
    colorAnim: new Animated.Value(0),
  }

  markAnswer = () => {
    Animated.timing(this.state.colorAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1000,
    }).start();
  }

  render() {
    const color = this.state.colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["#858a91", "lightgreen"],
    })
    const indexAnswers = this.props.indexAnswers;
    const index = this.props.indexQuestion;
    const answer = this.props.answer;
    return (
      <View key={indexAnswers}>
              <Pressable
                onPress={() => {
                  console.log('pressed')
                  this.markAnswer();
                  this.props.adjustScore(
                    parseInt(answer.scorePercentage),
                  );
                  this.props.saveAnswer(index, indexAnswers);
                }}
              >
                <Card.Content>
                  <Animated.View
                    style={{
                      backgroundColor: color,
                    }}
                  >
                    <Title>{`Answer ${indexAnswers} : ${answer.text}`}</Title>
                  </Animated.View>
                </Card.Content>
              </Pressable>
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
