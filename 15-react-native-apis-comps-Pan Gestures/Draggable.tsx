import React, { Component } from "react";
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  PanResponderGestureState
} from "react-native";

interface Point {
    x:number,
    y:number;
}

interface DraggableProps {

}

interface DraggableState {
  panState: PanResponderGestureState | undefined
}

export default class Draggable extends Component<DraggableProps, DraggableState> {
    state: Readonly<DraggableState> = {
      panState: undefined
    };

    panValue = new Animated.ValueXY({x:0, y:0})
  
    private _val : Point;

  componentWillMount() {
    // Add a listener for the delta value change
    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value);
    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onMoveShouldSetPanResponder: (e, gesture) => true,



      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
      ])
      // adjusting delta value
      this.state.pan.setValue({ x:0, y:0})
    });
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    return (
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[panStyle, styles.circle]}
        />
    );
  }
}

let CIRCLE_RADIUS = 30;
let styles = StyleSheet.create({
  circle: {
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  }
});