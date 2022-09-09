import React, { Component } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';
import TextsInToaster from './TextsInToaster';

const SHORT_DURATION = 3000;
const LONG_DURATION = 5000;
const TOP_POSITION = 20;
const BOTTOM_POSITION = -20;
const CENTER_POSITION = 0;

interface ToasterProps {
    duration: number;
    visible?: boolean;
    delay: number;
    positionX: number;
    positionY: number;
    animation?: boolean;
    onShow?: any;
    onShown?: () => void;
    onHide?: any;
    opacity?: number;
    messages: string[];
}

const translationToaster = new Animated.ValueXY({x: 0, y: 0});
const translationProgressBar = new Animated.Value(0);

export default class Toaster extends Component<ToasterProps, {}> {

  componentDidUpdate() {
    this.props.visible && this.showToaster();
  }

  showToaster() {
     Animated.sequence([
      Animated.timing(translationToaster.x, {
        toValue: this.props.positionX,
        duration: this.props.duration,
        useNativeDriver: true,
      }),
    Animated.parallel([
      Animated.timing(translationProgressBar, {
      toValue: 100,
      duration: this.props.delay,
      useNativeDriver: true,
    }),
        Animated.timing(translationToaster.x, {
          toValue: -1300,
          delay: this.props.delay,
          duration: 500,
          useNativeDriver: true,
        }),
    ])]).start();
  }
  

  render() {
    return (
      <View style={styles.container}>
        { this.props.visible &&
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { width: 250,
                height: 100,
                backgroundColor: 'orange',
                flex:1,
                justifyContent: 'center',
                alignItems: 'center',
                transform: [
                  { translateX: translationToaster.x },
                  { translateY: translationToaster.y },
                ],
              }   
            ]}     
          >
            <TextsInToaster messages={this.props.messages}/>
            <View style={styles.progressBar}>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "#8BED4F", 
              width: translationProgressBar.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
                extrapolate: "clamp",
              })
            }
            ]}     
          >
          </Animated.View>
        </View>
          </Animated.View>  
    
  }
        </View>
          
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center',
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