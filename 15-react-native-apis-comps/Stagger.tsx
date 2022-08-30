import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Animated, FlatList, ScrollView, StyleSheet, Text } from 'react-native';

const ITEM_WIDTH = 300;

const arrValues: number[] = [];
for(let i = 1; i < 500; i++){
    arrValues.push(i)
}

export default class Stagger extends Component {
    animatedValue = arrValues.map(value => new Animated.Value(0))

    componentDidMount(): void {
        this.animate();
    }

    animate() {
        const animations = arrValues.map((val, index) => Animated.timing(this.animatedValue[index], {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
           
        }));
        Animated.stagger(100, animations).start()
    }

  render() {
    const animItems = arrValues.map((val, index) => (
        <Animated.View key={index} style={[styles.item, {opacity: this.animatedValue[index], 
            backgroundColor: this.animatedValue[index].interpolate({
                inputRange: [0, 100],
                outputRange: ['orange', 'blue'],
              }),
              marginLeft: this.animatedValue[index].interpolate({
                inputRange: [0, 1],
                outputRange: [-ITEM_WIDTH/2, 0]
              }),
              transform: [
                {
                  rotate: this.animatedValue[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ]
              }]}>
            <Text style={styles.text}> Item {val}</Text>
        </Animated.View>
    ));
    return (
      <FlatList contentContainerStyle={styles.container}
        data={animItems}
        renderItem={({ item }) => item}
        // onEndReachedThreshold={0.2}
        // onEndReached={this.loadMoreItems}
        >
    </FlatList>
    )
  }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#ccc',
        padding: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5,
        width: ITEM_WIDTH,
        textAlign: 'center',
        marginLeft: 0,
        marginTop: 3,

    },
    text: {
        fontSize: 20,
    },
    container: {
        
    }
})