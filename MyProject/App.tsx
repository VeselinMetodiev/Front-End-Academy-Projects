import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import ImageForm from './Components/ImageForm';
import ImagesList from './Components/ImagesList';
import { ImagesAPI } from './dao/rest-api-client';
import { ImageModel } from './model/Image';
import { Optional, Point } from './model/shared-types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Favourites from './DragToFavourites';

export enum Views {
  FormView = 1, ImageListView, FavouritesView,
}

interface AppState {
  errors: string | undefined;
  images: ImageModel[];
  editedImage: Optional<ImageModel>;
  panState: Point | undefined;
  droppedItems: number[];
  activeView: Views;
  favourites: ImageModel[];
}

export default class App extends Component<{}, AppState>  {
  state: Readonly<AppState> = {
    errors: undefined,
    images: [],
    editedImage: undefined,
    panState: undefined,
    droppedItems: [],
    activeView: Views.FormView,
    favourites: []
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
    this.setState({ activeView : Views.FormView, editedImage: image });
  };

  handleDrop = (id:number) => {
    this.setState({droppedItems : this.state.droppedItems.concat(id)})
    const currentImage = this.state.images.find((im) => im.id === id);
    currentImage && this.setState({favourites : this.state.favourites.concat(currentImage)})
  }

  handleViewChange = () => {
    this.setState(({ activeView }) => ({
      activeView: activeView === Views.ImageListView ? Views.FormView : Views.ImageListView
    }));
  }

  handleViewChangeFavourites = () => {
    this.setState(({ activeView : Views.FavouritesView}));
  }

  addToFavourites = (image: ImageModel) => {
    this.setState({favourites: this.state.favourites.concat(image)})
  }

  removeFromFavourites = (image: ImageModel) => {
    this.setState({favourites: this.state.favourites.filter((im) => im.id !== image.id)})
  }

  render() {
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="green" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboarAvoidingView}
        >
          <FontAwesome.Button size={30} backgroundColor="green" color="white" onPress={this.handleViewChange} name='check-circle' >
            {this.state.activeView === Views.ImageListView ? 'Add New Image' : 'Show All Images'}
          </FontAwesome.Button>
          <FontAwesome.Button size={30} backgroundColor="orange" color="white" onPress={this.handleViewChangeFavourites} name='heart' >
            Favourites
          </FontAwesome.Button>
          {(() => {
            switch (this.state.activeView) {
              case Views.FormView:
                return (
                  <ImageForm image={this.state.editedImage} key={this.state.editedImage?.id} onCreateImage={this.handleCreateImage}/>
                )
              case Views.ImageListView:
                return (
                  <View style={{flex:1}}>
                  <Favourites/> 
                  <ImagesList currentView={this.state.activeView} onDrop={this.handleDrop} onFavourite={this.addToFavourites} images={this.state.images} onUpdate={() => console.log('update')} onDelete={this.handleDeleteImage}
                  onEdit={this.handleEditImage}/>
                  </View>
                )
              case Views.FavouritesView:
                return (
                  <ImagesList currentView={this.state.activeView} onDrop={this.handleDrop} onFavourite={this.removeFromFavourites} images={this.state.favourites} onUpdate={() => console.log('update')} onDelete={this.handleDeleteImage}
                  onEdit={this.handleEditImage}/>
               )
            }
          })()}
      
       </KeyboardAvoidingView>
      </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 0
  },
  keyboarAvoidingView: {
    flex: 1,
  }
});
