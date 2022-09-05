import React, { Component } from 'react'
import { Button, TextInput, View, Text, StyleSheet } from 'react-native';
import { ImageModel } from '../model/Image';
import { IdType, ImageListener, Optional } from '../model/shared-types'
import ImagePickerExample from './ImagePicker';
import * as Yup from "yup";

interface ImageFormProps {
  image: Optional<ImageModel>;
  onCreateImage: ImageListener
}

interface ImageFormState {
  title: string,
  description: string,
  tags: string[],
  imageURI: string,
  authorName: string,
  dateOfPicture: string,
  id: string,
}

export default class ImageForm extends Component<ImageFormProps, ImageFormState> {
  state: Readonly<ImageFormState> = {
  title: this.props.image?.title || '',
  description: this.props.image?.description || '',
  tags: this.props.image?.tags || [],
  imageURI: this.props.image?.imageURI || '',
  authorName: this.props.image?.authorName || '',
  dateOfPicture: this.props.image?.dateOfPicture || '',
  id: this.props.image?.id?.toString() || '',
  }

  renderError = (message: string) => {
  return <Text>{message}</Text>;
  }

  handleFieldChanged(field: string, text: string) {
    const stateUpdate = { [field]: text } as unknown as ImageFormState;
    this.setState(stateUpdate);
  }

  handleImageReset = () => {
    this.setState({title: '', description: '', tags: [], imageURI: '', authorName: '', dateOfPicture: ''})
}

handleImageSubmit = () => {
  this.props.onCreateImage(new ImageModel(
      this.state.title,
      this.state.description,
      this.state.tags,
      this.state.imageURI,
      this.state.authorName,
      this.state.dateOfPicture,
      this.state.id ? parseInt(this.state.id) : undefined));
      this.setState({title: '', description: '', tags: [], imageURI: '', authorName: '', dateOfPicture: ''})
}

handleSetImage = (imageURL: string) => {
  this.setState({imageURI: imageURL})
}

onSubmit = (values: any) => {
  alert(JSON.stringify(values, null, 2));
};

  render() {
    return (
         <View style={styles.container}>
      <View style={styles.registrationForm}>
      <Text style={styles.titleText}> Image Form </Text>
        <TextInput onChangeText={this.handleFieldChanged.bind(this, 'title')} value={this.state.title} placeholder="Title" style={styles.input}/>
        <TextInput onChangeText={this.handleFieldChanged.bind(this, 'description')} multiline={true} numberOfLines={2} value={this.state.description} placeholder="Description" style={styles.input}/>
        <TextInput onChangeText={this.handleFieldChanged.bind(this, 'authorName')} value={this.state.authorName} placeholder="Author" style={styles.input}/>
        <TextInput onChangeText={this.handleFieldChanged.bind(this, 'dateOfPicture')} value={this.state.dateOfPicture} placeholder="Date" style={styles.input}/>
        <TextInput onChangeText={this.handleFieldChanged.bind(this, 'imageURI')} value={this.state.imageURI} placeholder="Picture URL" style={styles.input}/>
        <ImagePickerExample onSubmit={this.handleSetImage}/>
      </View>
        <View style={styles.buttons}>
        <Button
          onPress={this.handleImageSubmit}
          title="Submit"
          color="#841584"
          accessibilityLabel="Submit Image"
        />
        <Button
          onPress={this.handleImageReset}
          title="Reset"
          color="#842317"
          accessibilityLabel="Reset Form"
        />
        </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#B2C8DF",
    borderRadius: 10,
    paddingTop: 70,
    //padding: 140,
  },
  registrationForm: {
    alignItems: "center",
    paddingBottom: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  gender: {
    fontSize: 14,
    fontWeight: "400",
  },
  input: {
    borderColor: "#6E85B7",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 5,
    padding: 5,
    width: 250,
  },
  buttons: {
    fontSize: 45,
    marginTop: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
},
});
