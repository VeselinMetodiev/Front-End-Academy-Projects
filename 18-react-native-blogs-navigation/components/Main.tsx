import React, { Component } from "react";
import { StyleSheet, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, FlatList, Dimensions, ColorSchemeName } from "react-native";
import { BlogsAPI } from "../dao/rest-api-client";
import { FilterType, Optional } from "../model/shared-types";
import { Form } from "./formbuilder/Form";
import { Post, PostStatus } from "../model/posts.model";
import PostList from "./PostList";
import { FormComponentConfigs } from "./formbuilder/form-types";
import IconButton from './IconButton';
import * as yup from 'yup';
import PostItem, { ITEM_HEIGHT, PostItemProps } from "./PostItem";
import DrawerNavigator from "../navigation/DrawerNavigator";

export const DEFAULT_PAGE_SIZE = 5;

export enum Views {
  PostFormView = 1, PostListView
}

interface BlogsMainProps {
  colorScheme: NonNullable<ColorSchemeName>;
}

interface BlogsMainState {
  activeView: Views;
  errors: string | undefined;
  posts: Post[];
  page: number;
  filter: FilterType;
  editedPost: Post;
  scrollIndex: number;
  favouritePosts: Post[]
}

export const EMPTY_IMAGE_DATA = { uri: '', width: 0, height: 0 };
export const EMPTY_POST = new Post('', '', [], EMPTY_IMAGE_DATA, 1);

class Main extends Component<BlogsMainProps, BlogsMainState> {
  state: BlogsMainState = {
    activeView: Views.PostListView,
    errors: '',
    posts: [],
    page: 0,
    filter: undefined,
    editedPost: EMPTY_POST,
    scrollIndex: 0,
    favouritePosts: []
  }

  postsListRef = React.createRef<FlatList<Post>>()

  async componentDidMount() {
    this.loadMorePosts();
  }

  loadMorePosts = async () => {
    try {
      const newPosts = await BlogsAPI.findByPage(this.state.page, DEFAULT_PAGE_SIZE);
      this.setState(({ posts, page, errors }) => ({
        posts: posts.concat(newPosts),
        page: page + 1,
        errors: undefined
      }))
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<BlogsMainState>, snapshot?: any): void {
    if (this.state.activeView === Views.PostListView) {
      if (Platform.OS === 'web') {
        // this.postsListRef.current?.scrollToOffset({offset: (this.state.scrollIndex-1) * ITEM_HEIGHT - 1});
      } else {
        this.postsListRef.current?.scrollToIndex({ index: this.state.scrollIndex });
      }
    }
  }

  handleUpdatePost = (post: Post) => {
    this.setState(({ posts }) => ({
      posts: posts.map(td => td.id === post.id ? post : td)
    }))
  }

  handleDeletePost = async (post: Post) => {
    try {
      await BlogsAPI.deleteById(post.id);
      this.setState(({ posts }) => ({
        posts: posts.filter(p => p.id !== post.id),
        errors: undefined
      }));
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleSubmitPost = async (post: Post) => {
    try {
      post.tags = post.tags.filter(tag => tag.trim().length > 0)
      if (post.id) { //edit post
        const updated = await BlogsAPI.update(post);
        const scrollIndex = this.state.posts.findIndex(p => p.id === updated.id)
        this.setState(({ posts }) => {
          const postsCopy = posts.slice();
          postsCopy[scrollIndex] = updated;
          return {
            posts: postsCopy,
            scrollIndex,
          }
        });
      } else { // create post
        const created = await BlogsAPI.create(post);
        const scrollIndex = this.state.posts.length;
        this.setState(({ posts }) => ({
          posts: posts.concat(created),
          scrollIndex,
        }));
      }
      this.setState({
        errors: undefined,
        editedPost: EMPTY_POST,
        activeView: Views.PostListView,
      });
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleFormCancel = () => {
    this.setState({
      errors: undefined,
      editedPost: EMPTY_POST,
      activeView: Views.PostListView,
    })
  }

  handleEditPost = (post: Post) => {
    this.setState({ editedPost: post, activeView: Views.PostFormView });
  }

  handlefilterChange = (status: FilterType) => {
    this.setState({ filter: status })
  }

  handleViewChange = () => {
    this.setState(({ activeView }) => ({
      activeView: activeView === Views.PostListView ? Views.PostFormView : Views.PostListView
    }));
  }

  addToFavourites = (post: Post) => {
    this.setState({favouritePosts: this.state.favouritePosts.concat(post)})
  }


  render() {
    return (
      <DrawerNavigator colorScheme={this.props.colorScheme}
        posts={this.state.posts}
        page={this.state.page}
        filter={this.state.filter}
        editedPost={this.state.editedPost}
        scrollIndex={this.state.scrollIndex}
        onDelete={this.handleDeletePost}
        onEdit={this.handleEditPost}
        onLoadMorePosts={this.loadMorePosts}
        initialValue={this.state.editedPost}
        onSubmit={this.handleSubmitPost}
        onCancel={this.handleFormCancel}
        onFavourite={this.addToFavourites}
    />
    );
  }
}

export default Main;


