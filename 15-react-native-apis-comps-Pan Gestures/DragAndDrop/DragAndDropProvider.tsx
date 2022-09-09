import React, { Component } from "react";
import { View, StyleSheet, Text, StatusBar, Button } from "react-native";
import Draggable, { Point } from "./Draggable";
import DropZone from "./DropZone";
import { DropAreaContext } from "./DropAreaContext";
import DropArea from "./DropArea";

const CIRCLE_RADIUS = 30;
const LOG_PANEL_HEIGHT = 30;
const DROP_ZONE_HEIGHT = 100;

interface DropAreaLocation {
  pageX: number;
  pageY: number;
  width: number;
  height: number;
}

interface DragAndDropProps {
  changePosition: () => void;
}

interface DragAndDropState {
  droppedItems: number[];
  panState: Point | undefined;
}

class DragAndDrop extends Component<DragAndDropProps, DragAndDropState> {
  state: Readonly<DragAndDropState> = {
    panState: undefined,
    droppedItems: [],
  };

  handleDrop = (id: number) => {
    this.setState({ droppedItems: this.state.droppedItems.concat(id) });
  };

  render() {
    return (
      <DropAreaContext.Consumer>
        {(area) => (
          <React.Fragment>
            <Text>
              PageX: {area.pageX}, PageY: {area.pageY}, Width: {area.width},
              Height: {area.height},
            </Text>
            <Button
              title={"Change Position of Drop Area"}
              onPress={this.props.changePosition}
            />
            <View style={styles.conatainer}>
              <View style={styles.textConatainer}>
                <Text>
                  {this.state.panState?.x}, {this.state.panState?.y}
                </Text>
              </View>
              <View style={styles.row}>
                <Draggable
                  id={1}
                  onDrop={this.handleDrop}
                  dropZoneHeight={area.height}
                  dropZoneWidth={area.width}
                  pageX={area.pageX}
                  pageY={area.pageY}
                />
               <Draggable
                  id={2}
                  onDrop={this.handleDrop}
                  dropZoneHeight={area.height}
                  dropZoneWidth={area.width}
                  pageX={area.pageX}
                  pageY={area.pageY}
                />
                <Draggable
                  id={3}
                  onDrop={this.handleDrop}
                  dropZoneHeight={area.height}
                  dropZoneWidth={area.width}
                  pageX={area.pageX}
                  pageY={area.pageY}
                />
              <Draggable
                  id={4}
                  onDrop={this.handleDrop}
                  dropZoneHeight={area.height}
                  dropZoneWidth={area.width}
                  pageX={area.pageX}
                  pageY={area.pageY}
                />
                <Draggable
                  id={5}
                  onDrop={this.handleDrop}
                  dropZoneHeight={area.height}
                  dropZoneWidth={area.width}
                  pageX={area.pageX}
                  pageY={area.pageY}
                />
                <StatusBar hidden />
              </View>
            </View>
          </React.Fragment>
        )}
      </DropAreaContext.Consumer>
    );
  }
}

interface AppState {
  dropAreaLocation: DropAreaLocation;
}

export default class DragAndDropProvider extends Component<{}, AppState> {
  state: Readonly<AppState> = {
    dropAreaLocation: {
      pageX: 100,
      pageY: 100,
      width: 100,
      height: 100,
    },
  };

  onDropAreaChange = () => {
    this.setState({
      dropAreaLocation: {
        pageX: Math.floor(Math.random() * 500),
        pageY: Math.floor(Math.random() * 500),
        width: Math.floor(Math.random() * 100 + 100),
        height: Math.floor(Math.random() * 100 + 100),
      },
    });
  };

  render() {
    return (
      <React.Fragment>
        <DropAreaContext.Provider value={this.state.dropAreaLocation}>
          <DropArea pageX={this.state.dropAreaLocation.pageX} pageY={this.state.dropAreaLocation.pageY} width={this.state.dropAreaLocation.width} height={this.state.dropAreaLocation.height}/>
          <DragAndDrop changePosition={this.onDropAreaChange}></DragAndDrop>
        </DropAreaContext.Provider>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
  },
  textConatainer: {
    width: "100%",
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
    flexDirection: "row",
    margin: 300,
  },
  dropZone: {
    backgroundColor: "lawngreen",
  },
});
