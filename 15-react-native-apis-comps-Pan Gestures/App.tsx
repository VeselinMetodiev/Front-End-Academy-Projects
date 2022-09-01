import React, { useRef, useState } from "react";
import { Animated, useWindowDimensions, View } from "react-native";
const CURSOR_SIDE_SIZE = 20;
const CURSOR_HALF_SIDE_SIZE = CURSOR_SIDE_SIZE / 2;

const numberArray : number[] = [];
export default () => {
   const [positionsX, setPositionsX] = useState(numberArray)
   const [positionsY, setPositionsY] = useState(numberArray)
   const dimensions = useWindowDimensions();
   
  const touch = useRef(
    new Animated.ValueXY({
      x: dimensions.width / 2 - CURSOR_HALF_SIDE_SIZE,
      y: dimensions.height / 2 - CURSOR_HALF_SIDE_SIZE,
    })
  ).current;

  function checkIfCircle(touchMoveX: any[], touchMoveY: any[]) {
    const totalAmount = touchMoveX.length;
    // sum up all coordinates and divide them by total length
    // the average is a cheap approximation of the center.
    const averageX =
      touchMoveX.reduce(function (previous, current) {
        return previous + current;
      }) / totalAmount;
   const averageY =
      touchMoveY.reduce(function (previous, current) {
        return previous + current;
      }) / totalAmount;

    // compute distance to approximated center from each point
    const distances = touchMoveX.map(function (x, index) {
      const y = touchMoveY[index];
      return Math.sqrt(Math.pow(x - averageX, 2) + Math.pow(y - averageY, 2));
    });
    // average of those distance is
    const averageDistance =
      distances.reduce(function (previous, current) {
        return previous + current;
      }) / distances.length;

    const min = averageDistance * 0.8;
    const max = averageDistance * 1.2;
    // filter out the ones not inside the min and max boundaries
    const inRange = distances.filter((d) => d > min && d < max)

    const minPercentInRange = 80;
    const percentInRange = (inRange.length / totalAmount) * 100;
    console.log(percentInRange);
    // by the % of points within those boundaries we can guess if it's circle
    if (percentInRange > minPercentInRange) {
      console.log("A cirlce");
    } else {
      console.log("Not a circle");
    }
  }

  return (
    <Animated.View
      // we’re letting our gesture responder guy know that this view should get all the move events happening on this part of the screen.
      onStartShouldSetResponder={() => true}
      //we want to update our animated value to store the current touch position
      onResponderMove={(event) => {
        touch.setValue({
          x: event.nativeEvent.locationX,
          y: event.nativeEvent.locationY,
        });
        console.log("<----------------->");
        positionsX.push(event.nativeEvent.locationX);
        positionsY.push(event.nativeEvent.locationY);
        console.log("X: ", event.nativeEvent.locationX);
        console.log("Y: ", event.nativeEvent.locationY);
        console.log("<----------------->");
      }}
      onResponderRelease={() => {
        Animated.spring(touch, {
          toValue: {
            x: dimensions.width / 2 - CURSOR_HALF_SIDE_SIZE,
            y: dimensions.height / 2 - CURSOR_HALF_SIDE_SIZE,
          },
          // left/top are not supported
          useNativeDriver: false,
        }).start();
        checkIfCircle(positionsX, positionsY);
        setPositionsX([]);
        setPositionsY([]);
      }}
      style={{ flex: 1 }}
    >
      <Animated.View
        style={{
          position: "absolute",
          left: Animated.subtract(touch.x, CURSOR_HALF_SIDE_SIZE),
          top: Animated.subtract(touch.y, CURSOR_HALF_SIDE_SIZE),
          height: CURSOR_SIDE_SIZE,
          width: CURSOR_SIDE_SIZE,
          borderRadius: CURSOR_HALF_SIDE_SIZE,
          backgroundColor: "orange",
        }}
      />
    </Animated.View>
  );
};
