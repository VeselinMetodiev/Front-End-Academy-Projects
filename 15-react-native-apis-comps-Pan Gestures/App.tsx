import React, { Component } from 'react'
import { View, StyleSheet, Text, StatusBar } from 'react-native'
import Draggable, { Point } from './Draggable'
import DropZone from './DropZone';
import MyComponent from './MyComponent';

const CIRCLE_RADIUS = 30;
const LOG_PANEL_HEIGHT= 30;
const DROP_ZONE_HEIGHT = 100;


interface AppState {
  panState: Point | undefined;
  droppedItems: number[];
}

export default class App extends Component<{}, AppState> {
  state: Readonly<AppState> = {
    panState: undefined,
    droppedItems: []
};

  handleDrop = (id:number) => {
    this.setState({droppedItems : this.state.droppedItems.concat(id)})
  }

  componentDidUpdate() {
    console.log(this.state.droppedItems)
  }

  render() {
    return (
      <View style={styles.conatainer}  >
        {/* <MyComponent/> */}
                <View style={styles.textConatainer}>
                    <Text>{this.state.panState?.x}, {this.state.panState?.y}</Text>
                </View>
                <DropZone droppedItems={this.state.droppedItems}/>
                <View style={styles.row}>
        <Draggable id={1} onDrop={this.handleDrop} dropZoneHeight={100}/>
        <Draggable id={2} onDrop={this.handleDrop} dropZoneHeight={100}/>
        <Draggable id={3} onDrop={this.handleDrop} dropZoneHeight={100}/>
        <Draggable id={4} onDrop={this.handleDrop} dropZoneHeight={100}/>
        <Draggable id={5} onDrop={this.handleDrop} dropZoneHeight={100}/>
        <StatusBar hidden />
        </View>
            </View>
    )
  }
}

const styles = StyleSheet.create({
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
row: {
  flexDirection: 'row',
  margin: 300,
},
dropZone: {
    backgroundColor: 'lawngreen',
},
  });