import React, { useRef, useState } from "react";
import { Animated, useWindowDimensions, View } from "react-native";
const CURSOR_SIDE_SIZE = 20;
const CURSOR_HALF_SIDE_SIZE = CURSOR_SIDE_SIZE / 2;

interface Point {
  x: number;
  y: number;
}

export default () => {
  const [positions, setPositions] = useState<Point[]>([]);
  const dimensions = useWindowDimensions();

  const touch = useRef(
    new Animated.ValueXY({
      x: dimensions.width / 2 - CURSOR_HALF_SIDE_SIZE,
      y: dimensions.height / 2 - CURSOR_HALF_SIDE_SIZE,
    })
  ).current;

  function checkIfCircle(touchMoveX: number[], touchMoveY: number[]) {
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
    const inRange = distances.filter((d) => d > min && d < max);

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

  function checkIfCircle1(touchMoveX: number[], touchMoveY: number[]) {
    let minX = 9999999;
    let maxX = 0;
    let minY = 99999;
    let maxY = 0;
    for (let i = 0; i < touchMoveX.length; i++) {
      if (minX > touchMoveX[i]) minX = touchMoveX[i];
      if (maxX < touchMoveX[i]) maxX = touchMoveX[i];
    }

    for (let i = 0; i < touchMoveY.length; i++) {
      if (minY > touchMoveY[i]) minY = touchMoveY[i];
      if (maxY < touchMoveY[i]) maxY = touchMoveY[i];
    }

    console.log('MaxX: ' + maxX)
    console.log('MaxY: ' + maxY)
    console.log('minX: ' + minX)
    console.log('minY: ' + minY)

    const averageX = (minX + maxX) / 2;
    const averageY = (minY + maxY) / 2;

    const average = (averageX - minX + averageY - minY)/2;
    console.log(average)
    const distances = touchMoveX.map(function (x, index) {
      const y = touchMoveY[index];
      return Math.sqrt(Math.pow(x - averageX, 2) + Math.pow(y - averageY, 2));
    });
      // average of those distance is
    const averageDistance =
    distances.reduce(function (previous, current) {
      return previous + current;
    }) / distances.length;

  const min = averageDistance * 0.9;
  const max = averageDistance * 1.1;
  // filter out the ones not inside the min and max boundaries
  const inRange = distances.filter((d) => d > min && d < max);
  const totalAmount = touchMoveX.length;
  const minPercentInRange = 80;
  console.log('inRanve: ' + inRange)
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
        setPositions((posX) => posX.concat({x: event.nativeEvent.locationX, y: event.nativeEvent.locationY}));
        console.log("X: ", event.nativeEvent.locationX);
        console.log("Y: ",event.nativeEvent.locationY);
        console.log("<----------------->");
      }}
      onResponderRelease={() => {
        let positionsX = positions.map((point) => point.x)
        let positionsY = positions.map((point) => point.y)
        checkIfCircle1(positionsX, positionsY);
          setPositions([]);
        Animated.spring(touch, {
          toValue: {
            x: dimensions.width / 2 - CURSOR_HALF_SIDE_SIZE,
            y: dimensions.height / 2 - CURSOR_HALF_SIDE_SIZE,
          },
          // left/top are not supported
          useNativeDriver: false,
        }).start();
      }}
      style={{ flex: 1 }}
    >
      {positions.map((point, index) =>  {
        return (
        <Animated.View
          key={index}
          style={{
            position: "absolute",
            left: Animated.subtract(point.x, CURSOR_HALF_SIDE_SIZE),
            top: Animated.subtract(point.y, CURSOR_HALF_SIDE_SIZE),
            height: CURSOR_SIDE_SIZE,
            width: CURSOR_SIDE_SIZE,
            borderRadius: CURSOR_HALF_SIDE_SIZE,
            backgroundColor: "silver",
          }}
        />
        )
        })}

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
