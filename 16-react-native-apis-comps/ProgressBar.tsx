import React, { useEffect, useState, useRef, Component } from "react";
import { Text, View, StyleSheet, Animated, Button } from "react-native";
import Constants from "expo-constants";

interface ProgressBarProps {
  min: number;
  max: number;
  current: number;
}

const translation = new Animated.Value(0);

class ProgressBar extends Component<ProgressBarProps> {

componentDidUpdate(prevProps : ProgressBarProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.current !== prevProps.current) {
    Animated.timing(translation, {
      toValue: this.props.current,
      duration: (this.props.current - this.props.min) * 150,
      useNativeDriver: true,
  }).start();
  }
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
               <Text>{this.props.current}%</Text>
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
