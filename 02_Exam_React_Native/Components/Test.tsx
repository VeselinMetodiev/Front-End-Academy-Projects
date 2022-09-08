import React, { Component } from "react";
import { View, StyleSheet, Pressable, Text, Animated, Button } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { Answer } from "../model/Answer";
import { Question } from "../model/Question";

interface TestProps {
  questions: Question[];
  onSubmit: (score: number, answers: number[][]) => void;
}

interface TestState {
  currentQuestionIndex: number;
  totalPercentageScore: number;
  colorAnim: Animated.Value[];
  selectedAnswers: number[][]; //Contains index of question and index of answers that were selected
}

export default class Test extends Component<TestProps, TestState> {
  totalAnswers = this.props.questions.reduce(
    (previousValue: number, currentValue) =>
      previousValue + currentValue.answers.length,
    0
  );

  constructor(props: TestProps) {
    super(props);
    console.log(props.questions.length);
  }

  state: Readonly<TestState> = {
    currentQuestionIndex: 0,
    totalPercentageScore: 0,
    selectedAnswers: new Array<number[]>(this.props.questions.length).fill(
      [],
      0,
      this.props.questions.length
    ),
    //colorAnim: [new Animated.Value(0)].fill(new Animated.Value(0), this.totalAnswers)
    colorAnim: [
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
    ],
  };

  adjustScore = (score: number, index: number) => {
    Animated.timing(this.state.colorAnim[index], {
      toValue: 1,
      useNativeDriver: true,
      duration: 2000,
    }).start();

    this.setState({
      totalPercentageScore: this.state.totalPercentageScore + score,
    });
   this.setState({
      currentQuestionIndex: this.state.currentQuestionIndex + 1,
    });
  };

  saveAnswer = (questionIndex: number, selectedAnswerIndex: number) => {
    console.log("question index:", questionIndex, selectedAnswerIndex);
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
      console.log(result);
      return result;
    });
    console.log("Selected answers ", this.state.selectedAnswers);
  };

  fillArray = () => {
    let color: Animated.AnimatedInterpolation[] = [];
    for (let i = 0; i < this.totalAnswers; i++) {
      color.push(
        this.state.colorAnim[i].interpolate({
          inputRange: [0, 1],
          outputRange: ["#858a91", "lightgreen"],
        })
      );
    }
    return color;
  };

  color = this.fillArray();

  handleSubmit = () => {
      this.props.onSubmit(this.state.totalPercentageScore, this.state.selectedAnswers);
  }

  render() {
    //let question = this.props.questions[this.state.currentQuestionIndex]
    //let index = this.state.currentQuestionIndex;
    return ( <View> { this.props.questions.map((question, index) => (
      <View key={index} style={styles.questionItem}>
        <Text>{JSON.stringify(this.state.selectedAnswers)}</Text>
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
              <Pressable
                onPress={() => {
                  this.adjustScore(
                    parseInt(answer.scorePercentage),
                    indexAnswers + index
                  );
                  this.saveAnswer(index, indexAnswers);
                }}
              >
                <Card.Content>
                  <Animated.View
                    style={{
                      backgroundColor: this.color[index + indexAnswers],
                    }}
                  >
                    <Title>{`Answer ${indexAnswers} : ${answer.text}`}</Title>
                  </Animated.View>
                </Card.Content>
              </Pressable>
            </View>
          ))}
        </Card>
      </View>
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
