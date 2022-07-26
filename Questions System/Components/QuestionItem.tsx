import React, { Component } from "react";
import { StyleSheet, Text, View, Animated, PanResponderGestureState, PanResponder, GestureResponderEvent} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { IdType, QuestionListener, Point } from "../model/shared-types";
import { Question } from "../model/Question";


interface QuestionItemProps {
  question: Question;
  onUpdate: QuestionListener;
  onDelete: QuestionListener;
  onEdit: QuestionListener;
  dropZoneHeight: number;
  id: IdType;
  onDrop: (id:number) => void;
  onUp: (num: number) => void;
  onDown: (num: number) => void;
}

interface QuestionItemState {
  
}


export default class QuestionItem extends Component<QuestionItemProps, QuestionItemState> {
  
render() {
  return (
      <View style={styles.questionItem}>
      <Card style={styles.card}>
    <Card.Title title={'Question'} left={undefined} />
    <Card.Content>
      <Title>Points Number: {this.props.question.pointsNumber}</Title>
      <Paragraph>{this.props.question.text}</Paragraph>
    </Card.Content>
    <Card.Cover style={styles.avatars} source={{ uri: this.props.question.imageURI }} />
    {this.props.question.answers.map((answer, index) => 
    <Card.Content key={index}>
    <Title>{`Answer ${index}`}</Title>
    <Paragraph>{`${answer.text} Score %: ${answer.scorePercentage}`}</Paragraph>
  </Card.Content>
    )}
    <Card.Actions>
    <View style={styles.questionItemRight}>
         <FontAwesome.Button
              style={styles.button}
              name="times-circle"
              size={40}
              color="red"
              backgroundColor="transparent"
              onPress={() => this.props.onDelete(this.props.question)}
            />
        <FontAwesome.Button
          style={styles.button}
          name="pencil-square"
          size={40}
          color="gray"
          backgroundColor="transparent"
          onPress={() => { this.props.onEdit(this.props.question); console.log(this.props.question)}}
        />
         <FontAwesome.Button
              style={styles.button}
              name="arrow-up"
              size={40}
              color="green"
              backgroundColor="transparent"
              onPress={() => {console.log('up was pressed'); this.props.onUp(0)}}
            />
        <FontAwesome.Button
          style={styles.button}
          name="arrow-down"
          size={40}
          color="red"
          backgroundColor="transparent"
          onPress={() => this.props.onDown(0)}
        />
        </View>
    </Card.Actions>
  </Card>
  </View>
  );
}
};

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
