import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, useColorScheme, View, Image } from 'react-native';
import { EMPTY_POST } from '../components/Main';
import { ITEM_HEIGHT, ITEM_PADDING } from '../components/PostItem';
import { BlogsAPI } from '../dao/rest-api-client';
import { PostStatus } from '../model/posts.model';
import { RootDrawerParamList } from '../navigation/DrawerNavigator';
import { StackParamList } from '../navigation/StackNavigator';

type DetailsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'PostDetails'>,
  DrawerScreenProps<RootDrawerParamList>
>

export function PostDetailsScreen({ route, navigation }: DetailsScreenProps) {
    const [post, setPost] = useState(EMPTY_POST);
    
    /* 2. Get the param */
    const { postId } = route.params;
    
    const loadPost = async () => {
        try {
          const post = await BlogsAPI.findById(postId);
          setPost(post)
        } catch (err) {
          navigation.push('NotFound');
        }
      }

      useEffect(() => {
        loadPost();
      }, [])

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text style={{color: 'tomato'}}>itemId: {JSON.stringify(postId)}</Text>
        <View style={styles.itemContainer}>
        <View style={styles.postItem}>
          <View style={styles.postHeader}>
            <Image
              resizeMode="contain"
              style={styles.postImage}
              source={{ uri: post.image.uri }}
            ></Image>
            <View style={styles.postContent}>
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.postMetadata}>
                {PostStatus[post.status]}, Author ID: {post.authorId}
              </Text>
              <View style={styles.postTags}>
                {post.tags.map((tag) => (
                  <Text key={tag} style={styles.postTag}>
                    {tag}
                  </Text>
                ))}
              </View>
            </View>
          </View>

          <ScrollView style={styles.textScrollView} nestedScrollEnabled={true}>
            <Text style={styles.postText}>{post.content}</Text>
          </ScrollView>      
        </View>
      </View>
        <Button
          title="Go to Posts"
          onPress={() =>
            navigation.push('Tabs')
          }
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const styles = StyleSheet.create({
    itemContainer: {
      padding: ITEM_PADDING,
      height: ITEM_HEIGHT,
    },
    postItem: {
      padding: 5,
      backgroundColor: "#eee",
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "#aaa",
      height: ITEM_HEIGHT - 2 * ITEM_PADDING,
    },
    postHeader: {
      marginTop: 10,
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      gap: 15,
    },
    postImage: {
      width: "30%",
      height: "auto",
      borderRadius: 10,
      marginRight: 10,
    },
    postContent: {
      width: "70%",
      display: "flex",
      flexDirection: "column",
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
    },
    postMetadata: {
      fontSize: 18,
      fontStyle: "italic",
    },
    postTags: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    postTag: {
      margin: 5,
      paddingHorizontal: 20,
      paddingVertical: 5,
      fontSize: 18,
      fontWeight: "bold",
      backgroundColor: "#fccb58",
      borderRadius: 15,
      borderColor: "green",
    },
    textScrollView: {
      height: (ITEM_HEIGHT * 2) / 3,
      marginTop: 5,
      marginBottom: 10,
    },
    postText: {
      width: "100%",
      fontSize: 18,
    },
    postItemId: {
      paddingRight: 10,
      fontSize: 24,
    },
    postItemButtons: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      padding: 0,
      backgroundImage: "gray",
      border: 1,
    },
    button: {
      paddingVertical: 3,
      paddingHorizontal: 10,
    },
    buttonText: {
      padding: 0,
    },
    card: {
      padding: 10,
      borderWidth: 1,
      borderColor: "grey",
      borderRadius: 10,
      width: 280,
      display: "flex",
      alignItems: "center",
      backgroundColor: "#C4D7E0",
    },
  
    btnContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 40,
      marginTop: 20,
    },
  });