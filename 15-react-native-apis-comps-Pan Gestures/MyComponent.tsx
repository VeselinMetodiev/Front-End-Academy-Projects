import React from "react";
import { Animated, View, Text, StyleSheet } from "react-native";

interface Props {
    pageX: (px:number) => void;
    pageY: (py:number) => void;
}

export default class MyComponent extends React.Component {
    myComponent: View | null | undefined;

    render() {
        return <View ref={view => { this.myComponent = view; }}>
            <Animated.View style={[styles.dropZone, {height: 100}]}>
        <Text style={styles.dropZoneText}>Drop them here!</Text>
        </Animated.View>
        </View>
    }
    componentDidMount() {
        // Print component dimensions to console
        this.myComponent!.measure( (fx, fy, width, height, px, py) => {
            console.log('Component width is: ' + width)
            console.log('Component height is: ' + height)
            console.log('X offset to frame: ' + fx)
            console.log('Y offset to frame: ' + fy)
            console.log('X offset to page: ' + px)
            console.log('Y offset to page: ' + py)
        })        
    }
}

let styles = StyleSheet.create({
    dropZone: {
        backgroundColor: 'lawngreen',
    },
    dropZoneText: {
        height: 100,
    },
});