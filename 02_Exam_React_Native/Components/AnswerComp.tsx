import React, { Component } from 'react'
import { Animated, Pressable, View, StyleSheet, Text } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { Answer } from '../model/Answer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { boolean } from 'yup';

interface AnswerProps {
  answer: Answer;
  indexQuestion: number;
  indexAnswers: number;
  adjustScore: (score : number) => void;
  saveAnswer: (indexQuestion: number, indexAnswer: number) => void;
  onChange: (checked : boolean) => void;

}

interface AnswerState {
  colorAnim: Animated.Value;
  checked: boolean;
}

interface CheckboxProps {
  checked: boolean;
  onChange: (checked : boolean) => void;
}

function MyCheckbox({
  checked,
  onChange ,
} : CheckboxProps) {
  function onCheckmarkPress() {
    onChange(!checked);
  }

  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onCheckmarkPress}>
      {checked && <Ionicons name="checkmark" size={24} color="white" />}
    </Pressable>
  );
}

export default class AnswerComp extends Component<AnswerProps, AnswerState> {
  state: Readonly<AnswerState> = {
    colorAnim: new Animated.Value(0),
    checked: false,
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
        <View style={styles.checkboxContainer}>
        <MyCheckbox
          checked={this.state.checked}
          onChange={this.props.onChange} />
        <Text>{`⬅️ Click!`}</Text>
      </View>
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
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'coral',
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    backgroundColor: 'coral',
  },

  appContainer: {
    flex: 1,
    alignItems: 'center',
  },

  appTitle: {
    marginVertical: 16,
    fontWeight: 'bold',
    fontSize: 24,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkboxLabel: {
    marginLeft: 8,
    fontWeight: 500,
    fontSize: 18,
  },
});
