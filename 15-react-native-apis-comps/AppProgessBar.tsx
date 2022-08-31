
import React, { Component, useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import ProgressBar from "./ProgressBar";

const MAX_NUMBER_PROGRESSBAR = 100

const App = () => {
    const [current, setCurrent] = useState(0)

    function handlePress() {
        if(current < MAX_NUMBER_PROGRESSBAR){
        const randomNumber = Math.floor(Math.random() * (30)) + 10
        console.log(randomNumber)
        console.log(current)
        if(current + randomNumber > MAX_NUMBER_PROGRESSBAR){
            setCurrent(MAX_NUMBER_PROGRESSBAR);
        } else {
            setCurrent(current + randomNumber)
        }
    }
}

    return (
        <View>
        <ProgressBar current={current} min={0} max={MAX_NUMBER_PROGRESSBAR}/>
      <Pressable onPress={handlePress}>
        <Text>Click me</Text>
      </Pressable>
      </View>
    )
}

export default App;


