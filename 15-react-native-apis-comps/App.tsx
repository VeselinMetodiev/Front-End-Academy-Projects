import React, { Component } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import LayoutAnimationClass from './LayoutAnimation'
import LayoutAnimation from './LayoutAnimation'
import LayoutSquare from './LayoutAnimationSquare'
import LightBox, { SAMPLE_IMAGES } from './LightBox'

export default class App extends Component {
  render() {
    return (
        <SafeAreaView style={styles.container}>
        {/* <LightBox height={300} images={SAMPLE_IMAGES}/> */}
        <LayoutAnimationClass/>
        <LayoutSquare/>
        </SafeAreaView>
      
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  })
