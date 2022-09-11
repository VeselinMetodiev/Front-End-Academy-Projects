import React, { Component } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ImagePickerProps {
  onSubmit: (imageURI : string) => void;
}

interface ImagePickerState {
    imageURI: string;
}

export default class ImagePickerExample extends Component<ImagePickerProps, ImagePickerState> {
  state: Readonly<ImagePickerState> = {
    imageURI: '',
  }

    pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({imageURI: result.uri});
      this.props.onSubmit(this.state.imageURI);
    }
  };
render(){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={this.pickImage} />
      {/* {this.state.imageURI && <Image source={{ uri: this.state.imageURI }} style={{ width: 200, height: 200 }} />} */}
    </View>
  );
}
}