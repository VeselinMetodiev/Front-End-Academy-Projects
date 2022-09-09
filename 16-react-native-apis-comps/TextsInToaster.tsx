import React, { Component } from 'react'
import { Animated, Text } from 'react-native'

interface TextComponentsProps {
messages : string[]
}

export default class TextsInToaster extends Component<TextComponentsProps, {}> {
    
    translationTexts = [new Animated.ValueXY({x: 0, y:0}), new Animated.ValueXY({x: 0, y:0}), new Animated.ValueXY({x: 0, y:0})];


    componentDidMount() {
        Animated.sequence([
            Animated.parallel([ Animated.timing(this.translationTexts[0].x, {
                toValue: -1300,
                useNativeDriver: true,
                duration: 1000,
                delay: 1200,
              }),
              Animated.timing(this.translationTexts[1].y, {
                toValue: -20,
                useNativeDriver: true,
                duration: 1000,
                delay: 1200,
              }),
              Animated.timing(this.translationTexts[2].y, {
                toValue: -20,
                useNativeDriver: true,
                duration: 1000,
                delay: 1200,
              })]),
              Animated.parallel([
            Animated.timing(this.translationTexts[2].y, {
                    toValue: -20,
                    useNativeDriver: true,
                    duration: 1000,
                    delay: 1200,
                  }),
          Animated.timing(this.translationTexts[1].x, {
            toValue: -1300,
            useNativeDriver: true,
            duration: 1000,
            delay: 1200,
          }),
        ]),
            Animated.timing(this.translationTexts[2].x, {
                toValue: -1300,
                useNativeDriver: true,
                duration: 1000,
                delay: 1200,
            })]).start();
        }
    

  render() {
    let count = 0;
    return (  
      this.props.messages.map((message) =>  
      <Animated.View 
      style={[
        { 
          flex:1,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [
            { translateX: this.translationTexts[count].x },
            { translateY: this.translationTexts[count++].y}
          ],
        }   
      ]}     
      >
        <Text>{message}</Text>
      </Animated.View>
      )
    )
  }
}
