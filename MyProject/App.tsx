import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import ImageForm from './Components/ImageForm';
import ImagesList from './Components/ImagesList';
import { ImagesAPI } from './dao/rest-api-client';
import Favourites from './DragToFavourites';
import DynamicForm from './DynamicForm';
import FormikForm from './FormikForm';
import { ImageModel } from './model/Image';
import { Optional, Point } from './model/shared-types';
import MyModal from './MyModal';


interface AppState {
  errors: string | undefined;
  images: ImageModel[];
  editedImage: Optional<ImageModel>;
  panState: Point | undefined;
  droppedItems: number[];
}

export default class App extends Component<{}, AppState>  {
  state: Readonly<AppState> = {
    errors: undefined,
    images: [],
    editedImage: undefined,
    panState: undefined,
    droppedItems: []
  }

  async componentDidMount() {
    try {
      const allImages = await ImagesAPI.findAll();
      this.setState({ images: allImages, errors: undefined });
    } catch (err) {
      this.setState({ errors: err as string });
    }
  }

  handleUpdateImage(image: ImageModel) {
    this.setState(({ images }) => ({
      images: images.map((td) => (td.id === image.id ? image : td)),
    }));
  }

  handleDeleteImage= async (image: ImageModel) => {
    try {
      await ImagesAPI.deleteById(image.id);
      this.setState(({ images }) => ({
        images: images.filter((td) => td.id !== image.id),
        errors: undefined,
      }));
    } catch (err) {
      this.setState({ errors: err as string });
    }
  };

  handleCreateImage = async (image: ImageModel) => {
    try {
      if (image.id) {
        //edit image
        const updated = await ImagesAPI.update(image);
        this.setState(({ images }) => ({
          images: images.map((us) => (us.id === updated.id ? updated : us)),
          errors: undefined,
          editedImage: undefined,
        }));
      } else {
        // create image
        const created = await ImagesAPI.create(image);
        this.setState(({ images }) => ({
          images: images.concat(created),
          errors: undefined,
        }));
      }
    } catch (err) {
      this.setState({ errors: err as string });
    }
  };

  handleEditImage = (image: ImageModel) => {
    this.setState({ editedImage: image });
  };

  handleDrop = (id:number) => {
    this.setState({droppedItems : this.state.droppedItems.concat(id)})
  }

  render() {
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="green" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboarAvoidingView}
        >
      <ImageForm image={this.state.editedImage} key={this.state.editedImage?.id} onCreateImage={this.handleCreateImage}/>
      <ImagesList onDrop={this.handleDrop} images={this.state.images} onUpdate={() => console.log('update')} onDelete={this.handleDeleteImage}
                    onEdit={this.handleEditImage}/>
      {/* <Favourites/> */}
       </KeyboardAvoidingView>
      </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
  },
  keyboarAvoidingView: {
    flex: 1
  },
});
