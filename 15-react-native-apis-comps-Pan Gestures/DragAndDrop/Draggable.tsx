import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
    StyleSheet,
    View,
    PanResponder,
    Animated,
    PanResponderGestureState,
    GestureResponderEvent,
    Text,
    SafeAreaView
} from "react-native";

const CIRCLE_RADIUS = 30;
const LOG_PANEL_HEIGHT= 30;

const INTIAL_POS = { x: 0, y: 0 }

export interface Point {
    x: number;
    y: number;
}

interface DraggableProps {
  dropZoneHeight: number;
  dropZoneWidth: number;
  pageX: number;
  pageY: number;
  id: number;
  onDrop: (id:number) => void;
}

interface DraggableState {
    panState: Point | undefined;
    showDraggable: boolean;
}

export default class Draggable extends Component<DraggableProps, DraggableState> {
  panValue = new Animated.ValueXY(INTIAL_POS);
  translationOpacity = new Animated.Value(1);
    state: Readonly<DraggableState> = {
        panState: undefined,
        showDraggable: true,
    };

    componentDidMount(){
        console.log(`Height: ${this.props.dropZoneHeight}, Width: ${this.props.dropZoneWidth}, PageX: ${this.props.pageX}, PageY: ${this.props.pageY}`)
    }    

    isDropArea(gesture:PanResponderGestureState) {
        return (gesture.moveY < (this.props.pageY + this.props.dropZoneWidth)) &&  (gesture.moveY > this.props.pageY) && 
        (gesture.moveX < (this.props.pageX + this.props.dropZoneHeight)) &&  (gesture.moveX > this.props.pageX);
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
              this.props.onDrop(this.props.id);
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
                translateX: Animated.subtract(this.panValue.x, CIRCLE_RADIUS)
            }, {
                translateY: Animated.subtract(this.panValue.y, CIRCLE_RADIUS + LOG_PANEL_HEIGHT + this.props.dropZoneHeight)
            }]
        }
        return (
            // <View style={styles.conatainer}  >
            //     <View style={styles.textConatainer}>
            //         <Text>{this.state.panState?.x}, {this.state.panState?.y}</Text>
            //     </View>
            //     <DropZone height={this.props.dropZoneHeight}/>
            <View>
               { this.state.showDraggable && <Animated.View
                    {...this.panResponder.panHandlers}
                    style={{ ...panStyle, ...styles.circle, ...{opacity: this.translationOpacity} }}
                />
               }
             </View>
        );
    }
}

let styles = StyleSheet.create({
    conatainer: {
        flex: 1,
    },
    textConatainer: {
        width: '100%',
        height: LOG_PANEL_HEIGHT,
    },
    circle: {
        zIndex: 1,
        backgroundColor: "skyblue",
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS,
    },
    dropZone: {
        backgroundColor: 'lawngreen',
    },
});