import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScaledSize,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";

const BASE_URL = 'localhost:19000';
export const SAMPLE_IMAGES = [
  `http://${BASE_URL}`,
  "https://placekitten.com/200/301",
  "https://placekitten.com/200/302",
  "https://placekitten.com/200/303",
  "https://placekitten.com/200/304",
  "https://placekitten.com/200/305",
  "https://placekitten.com/200/306",
];

const window = Dimensions.get("window");

interface LightBoxProps {
  images: string[];
  height: number;
}

interface LightBoxState {
  dimension: {
    window: ScaledSize;
  };
}

export default class LightBox extends Component<LightBoxProps, LightBoxState> {
  state: Readonly<LightBoxState> = {
    dimension: {
      window,
    },
  };

  scrollX = new Animated.Value(0);

  onDimensionsChange = ({ window }: { window: ScaledSize }) =>
    this.setState({
      dimension: {
        window,
      },
    });

  componentDidMound(): void {
    Dimensions.addEventListener("change", this.onDimensionsChange);
  }

  render() {
    const windowWidth = this.state.dimension.window.width;
    const imageHeight = Math.floor(0.8 * this.props.height);

    return (
      <View style={[styles.scrollContainer, { height: this.props.height, width: windowWidth}]}>
        <Animated.ScrollView
          style={{width: windowWidth}}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: this.scrollX,
                },
              },
            },
          ])}
          scrollEventThrottle={1}
        >
          {this.props.images.map((image, index) => (
            <View
              style={{
                width: windowWidth,
                height: imageHeight,
              }}
              key={index}
            >
              <ImageBackground source={{ uri: image }} style={styles.card}>
                <View style={styles.textContainer}>
                  <Text style={styles.imageText}>Image - {index + 1}</Text>
                </View>
              </ImageBackground>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  imageText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
