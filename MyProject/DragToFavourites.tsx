import React, { Component } from 'react'
import { View, StyleSheet, Text, StatusBar } from 'react-native'
import DropZone from './DropZone';
import { Point } from './model/shared-types';

const CIRCLE_RADIUS = 30;

interface AppState {
  panState: Point | undefined;
  droppedItems: number[];
}

export default class Favourites extends Component<{}, AppState> {
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
        <DropZone droppedItems={this.state.droppedItems}/>
    )
  }
}

