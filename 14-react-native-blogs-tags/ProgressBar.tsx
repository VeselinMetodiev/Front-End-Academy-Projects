import React, { useEffect, useState, useRef, Component } from "react";
import { Text, View, StyleSheet, Animated, Button } from "react-native";
import Constants from "expo-constants";

interface ProgressBarState {
  current: number;
}

interface ProgressBarProps {
  min: number;
  max: number;
  onFinish : () => void;
}

const translation = new Animated.Value(0);

class ProgressBar extends Component<ProgressBarProps, ProgressBarState> {
  state: Readonly<ProgressBarState> = {
    current: this.props.min,
};

countInterval: NodeJS.Timer | undefined = undefined;

componentDidMount() {
  this.countInterval = setInterval(() => this.setState({current: this.state.current + 33}), 100);
}

componentDidUpdate() {
  this.newAnimations(this.state.current);
  if (this.state.current >= this.props.max) {
    this.props.onFinish();
    clearInterval(this.countInterval);
    this.setState({current : 100})
  }
}

  newAnimations = (count: number) => 
  {
    Animated.timing(translation, {
                toValue: count,
                duration: 100,
                useNativeDriver: true,
            }).start();
            console.log(count);
  }
          
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading....</Text>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "#8BED4F", 
              width: translation.interpolate({
                inputRange: [this.props.min, this.props.max],
                outputRange: ["0%", "100%"],
                extrapolate: "clamp",
              })
            }
            ]}     
          >
               <Text>{this.state.current}%</Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  progressBar: {
    height: 20,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
  },
});
