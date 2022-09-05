import React, { Component} from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'

const DROP_ZONE_HEIGHT = 100;

interface DropZoneProps {
    height?: number;
    droppedItems: number[];
}

export default class DropZone extends Component<DropZoneProps, {}> {

    dropZoneHeight = this.props.height || DROP_ZONE_HEIGHT;

    
  render() {
    return (
        <Animated.View style={[styles.dropZone, {height: this.dropZoneHeight}]}>
        <Text style={styles.dropZoneText}>{"Drag to Favourites!" + this.props.droppedItems }</Text>
        </Animated.View>
    )
  }
}

let styles = StyleSheet.create({
    dropZone: {
        backgroundColor: 'lawngreen',
    },
    dropZoneText: {
        height: DROP_ZONE_HEIGHT,
    },
});