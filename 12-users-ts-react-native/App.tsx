import React, { Component } from "react";
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import TurboButton from "./builders/TurboButton";
import { Form } from "./components/formbuilder/Form";
import { FormComponentConfigs } from "./components/formbuilder/form-types";
import PostList from "./components/posts/PostList";
import LoginForm from "./components/users/LoginForm";
import RegistrationForm from "./components/users/RegistrationForm";
import UserList from "./components/users/UserList";
import { BlogsAPI, UsersAPI } from "./dao/rest-api-client";
import { Post, PostStatus } from "./model/posts.model";
import { FilterType, Optional } from "./model/shared-types";
import { User } from "./model/user.model";
import * as yup from 'yup';

export enum Views {
  Registration = 1, Login, InApp, PostFormView, PostListView
}

interface AppState {
  activeView: Views;
  errors: string | undefined;
  posts: Post[];
  filter: FilterType;
  editedPost: Post;
  scrollIndex: number;
  users: User[];
  editedUser: Optional<User>;
}

export const EMPTY_IMAGE_DATA = { uri: '', width: 0, height: 0 };
const EMPTY_POST = new Post('', '', [], EMPTY_IMAGE_DATA, 1);

export default class App extends Component<{}, AppState> {
  state: Readonly<AppState> = {
    users: [],
    editedUser: undefined,
    filter: undefined,
    activeView: Views.Registration,
    errors: undefined,
    posts: [],
    editedPost: EMPTY_POST,
    scrollIndex: 0,
  };
  postsListRef = React.createRef<FlatList<Post>>()

  constructor(props: {}) {
    super(props);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  async componentDidMount() {
    //Blogs
    try {
      const allUsers = await UsersAPI.findAll();
      this.setState({ users: allUsers, errors: undefined });
    } catch (err) {
      this.setState({ errors: err as string });
    }

    //Posts
    try {
      const allPosts = await BlogsAPI.findAll();
      this.setState({ posts: allPosts, errors: undefined })
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleUpdateUser(user: User) {
    this.setState(({ users }) => ({
      users: users.map((td) => (td.id === user.id ? user : td)),
    }));
  }

  handleDeleteUser = async (user: User) => {
    try {
      await UsersAPI.deleteById(user.id);
      this.setState(({ users }) => ({
        users: users.filter((td) => td.id !== user.id),
        errors: undefined,
      }));
    } catch (err) {
      this.setState({ errors: err as string });
    }
  };

  handleCreateUser = async (user: User) => {
    try {
      if (user.id) {
        //edit user
        const updated = await UsersAPI.update(user);
        this.setState(({ users }) => ({
          users: users.map((us) => (us.id === updated.id ? updated : us)),
          errors: undefined,
          editedUser: undefined,
        }));
      } else {
        // create user
        const created = await UsersAPI.create(user);
        this.setState(({ users }) => ({
          users: users.concat(created),
          errors: undefined,
          activeView: Views.InApp,
        }));
      }
    } catch (err) {
      this.setState({ errors: err as string });
    }
  };

  handleEditUser = (user: User) => {
    this.setState({ editedUser: user });
  };


  handleFilterChange = (status: FilterType) => {
    this.setState({ filter: status });
  };

  handleViewChange = () => {
    this.setState(({ activeView }) => ({
      activeView: activeView === Views.Registration ? Views.Login : Views.Registration
    }));
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

  handleEditTodo = (post: Post) => {
    this.setState({ editedPost: post, activeView: Views.PostFormView });
  }

  handleViewChangePosts = () => {
    this.setState(({ activeView }) => ({
      activeView: activeView === Views.PostListView ? Views.PostFormView : Views.PostListView
    }));
  }

  handleInAppView= () => {
    this.setState({ activeView : Views.InApp})
  }

  handleLoginView = () => {
    this.setState({ activeView : Views.Login})
  }

  handleRegistrationView = () => {
    this.setState({ activeView : Views.Registration})
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="green" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboarAvoidingView}
      >
        <TurboButton textSize={30} backgroundColor="green" color="white" onPress={this.handleViewChangePosts} >
          {this.state.activeView === Views.PostListView ? 'Add New Post' : 'Show All Posts'}
        </TurboButton>
        {(() => {
          switch (this.state.activeView) {
            case Views.Registration:
              return (
                  <RegistrationForm
                    key={this.state.editedUser?.id}
                    user={this.state.editedUser}
                    onCreateUser={this.handleCreateUser}
                    onLoginUser={this.handleLoginView}
                  />
                );
            case Views.Login:
              return (
                <LoginForm onRegUser={this.handleRegistrationView} onLoginUser={this.handleInAppView}/>);
            case Views.InApp:
              return (
              <>
                <TurboButton textSize={32} buttonSize={100} backgroundColor="green" color="white" onPress={this.handleViewChange}>Log out</TurboButton>
                <UserList
                users={this.state.users}
                filter={this.state.filter}
                onUpdate={this.handleUpdateUser}
                onDelete={this.handleDeleteUser}
                onEdit={this.handleEditUser}
              />
              </>
        )
        case Views.PostFormView:
                return (
                  <Form<Post, PostFormPropToCompKindMapping>
                    config={postFormConfig}
                    // initialValue={new Post('Example Post', 'Example content ...', ['example', 'post'], 'https://www.publicdomainpictures.net/pictures/160000/velka/jeune-femme-poste-de-travail.jpg', 1)}
                    initialValue={this.state.editedPost}
                    onSubmit={this.handleSubmitPost}
                    onCancel={this.handleFormCancel} />);
              case Views.PostListView:
                return (
                  <PostList ref={this.postsListRef} posts={this.state.posts}
                    filter={this.state.filter}
                    onDelete={this.handleDeletePost}
                    onEdit={this.handleEditTodo}
                    scrollIndex={this.state.scrollIndex}
                  />);
      }
        })()}
</KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

type PostFormPropToCompKindMapping = {
  id: 'FormReadonlyTextComponent';
  title: 'FormTextComponent';
  content: 'FormTextComponent';
  tags: 'FormTextComponent';
  image: 'FormImageComponent';
  status: 'FormDropdownComponent';
  authorId: 'FormTextComponent';
}

const postFormConfig: FormComponentConfigs<Post, PostFormPropToCompKindMapping> = {
  id: {
    componentKind: 'FormReadonlyTextComponent',
    label: 'ID',
  },
  title: {
    label: 'Blog Title',
    validators: yup.string().min(3).max(40),
  },
  content: {
    label: 'Blog Content',
    options: {
      multiline: true,
    },
    validators: yup.string().min(40).max(2048),
  },
  tags: {
    convertor: {
      fromString: (tags: string) => tags.split(/\W+/),
      toString: (tagsArray: string[]) => tagsArray.toString()
    }
  },
  image: {
    componentKind: 'FormImageComponent',
    label: 'Blog Image URL',
    validators: yup.object().shape({
      uri: yup.string().required().test(
        'is-url',
        '${path} is not a valid URL',
        (value: string | undefined) => !!value && (value.startsWith('data') || yup.string().url().isValidSync(value))
      ),
      localUri: yup.string(),
      format: yup.string().oneOf(['jpeg', 'png', 'webp']),
      width: yup.number().integer().min(0),
      height: yup.number().integer().min(0)
    }),
  },
  status: {
    componentKind: 'FormDropdownComponent',
    label: 'Blog Status',
    options: {
      choices: [
        { label: PostStatus[PostStatus.Published], value: PostStatus.Published },
        { label: PostStatus[PostStatus.Draft], value: PostStatus.Draft }
      ]
    }
  },
  authorId: {
    label: 'Author ID',
    validators: yup.number().integer().positive(),
    convertor: {
      fromString: (value: string) => {
        const num = +value;
        return isNaN(num) ? 0 : num;
      },
      toString: (num: number) => num + ''
    }
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
  keyboarAvoidingView: {
    flex: 1
  },
  errors: {
    padding: 5,
    border: 1,
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: "#eecccc",
    color: "red",
    textAlign: "center",
  },
  app: {},
});