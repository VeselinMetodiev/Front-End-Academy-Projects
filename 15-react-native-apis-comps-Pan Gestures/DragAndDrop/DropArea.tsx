import React from "react";
import { Animated, View, Text, StyleSheet } from "react-native";
import { DropAreaContext } from "./DropAreaContext";

interface Props {
  pageX: number;
  pageY: number;
  width: number;
  height: number;
}

//call the callback of the context with consumer

export default class DropArea extends React.Component<Props> {
  DropArea: View | null | undefined;

  render() {
    return (
      <View
        ref={(view) => {
          this.DropArea = view;
        }}
      >
        <Animated.View
          style={[
            styles.dropZone,
            {
              height: this.props.height,
              width: this.props.width,
              position: "absolute",
              left: this.props.pageX,
              top: this.props.pageY,
            },
          ]}
        >
          <Text style={styles.dropZoneText}>Drop them here!</Text>
        </Animated.View>
      </View>
    );
  }

  componentDidMount() {
    // Print component dimensions to console
    this.DropArea!.measure((fx, fy, width, height, px, py) => {
      console.log("Component width is: " + width);
      console.log("Component height is: " + height);
      console.log("X offset to frame: " + fx);
      console.log("Y offset to frame: " + fy);
      console.log("X offset to page: " + px);
      console.log("Y offset to page: " + py);
      // this.props.pageX(px);
      // this.props.pageX(py);
      // this.props.pageX(width);
      // this.props.pageX(height);
    });
  }
}

let styles = StyleSheet.create({
  dropZone: {
    backgroundColor: "lawngreen",
  },
  dropZoneText: {
    height: 100,
  },
});
