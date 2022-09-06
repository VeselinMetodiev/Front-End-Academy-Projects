import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Animated, PanResponderGestureState, PanResponder, GestureResponderEvent} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { ImageModel } from "../model/Image";
import { IdType, ImageListener, Point } from "../model/shared-types";


interface ImageItemProps {
  image: ImageModel;
  onUpdate: ImageListener;
  onDelete: ImageListener;
  onEdit: ImageListener;
  dropZoneHeight: number;
  id: IdType;
  onDrop: (id:number) => void;
  onFavourite: (image: ImageModel) => void
}

interface ImageItemState {
  panState: Point | undefined;
  showDraggable: boolean;
}

const INTIAL_POS = { x: 0, y: 0 }

export default class ImageItem extends Component<ImageItemProps, ImageItemState> {
  panValue = new Animated.ValueXY(INTIAL_POS);
  translationOpacity = new Animated.Value(1);
    state: Readonly<ImageItemState> = {
        panState: undefined,
        showDraggable: true,
    };

    isDropArea(gesture:PanResponderGestureState) {
      return gesture.moveY > 1400;
    }

  // private _val: Point;
  private panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderMove: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
          // console.log({...gestureState});
          this.setState({ panState: { x: gestureState.moveX, y: gestureState.moveY } })
          Animated.event([
            null,
              { dx: this.panValue.x, dy: this.panValue.y}
          ], {
              useNativeDriver: false,
          })(e, gestureState);
      },

      onPanResponderRelease: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
          if (this.isDropArea(gestureState)) {
            console.log("Dropped circle with id: " + this.props.id)
            this.props.onDrop(this.props.id!);
              Animated.timing(this.translationOpacity, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }).start(() =>
              this.setState({
                 showDraggable: false
              })
            );
          } else { Animated.spring(this.panValue, {
              toValue: INTIAL_POS,
              friction: 5,
              useNativeDriver: false,
          }).start();
      }
  },
  });

render() {
  const panStyle = {
    transform: [{
        translateX: Animated.subtract(this.panValue.x, 30)
    }, {
        translateY: Animated.subtract(this.panValue.y, 30)
    }]
  }
  return (
   // <Animated.View {...this.panResponder.panHandlers} style={{ ...panStyle, ...styles.imageItem, ...{opacity: this.translationOpacity} }}>
   <View>
      <Card style={styles.card}>
    <Card.Title title={this.props.image.title} left={undefined} />
    <Card.Content>
      <Title>Author: {this.props.image.authorName}</Title>
      <Paragraph>{this.props.image.description}</Paragraph>
    </Card.Content>
    <Card.Cover style={styles.avatars} source={{ uri: this.props.image.imageURI }} />
    <Card.Actions>
    <View style={styles.imageItemRight}>
         <FontAwesome.Button
              style={styles.button}
              name="times-circle"
              size={40}
              color="red"
              backgroundColor="transparent"
              onPress={() => this.props.onDelete(this.props.image)}
            />
        <FontAwesome.Button
          style={styles.button}
          name="pencil-square"
          size={40}
          color="gray"
          backgroundColor="transparent"
          onPress={() => this.props.onEdit(this.props.image)}
        />
         <FontAwesome.Button
          style={styles.button}
          name="heart-o"
          size={40}
          color="orange"
          backgroundColor="transparent"
          onPress={() => this.props.onFavourite(this.props.image)}
        />
        </View>
    </Card.Actions>
  </Card>
  </View>
   // </Animated.View>
  );
}
};

const styles = StyleSheet.create({
  imageItem: {
    flex: 1,
    gap: 15,
    padding: 15,
    border: 10,
  },
  card: {
    borderWidth: 1,
  },
  imageItemRight: {
    flexDirection: "row",
    gap: 15,
    padding: 0,
    border: 1,
  },
  imageItemStatus: {
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
