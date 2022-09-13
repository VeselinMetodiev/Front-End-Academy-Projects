/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from "@react-navigation/material-top-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import * as React from "react";
import { Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabTwoScreen from "../screens/TabTwoScreen";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { Post } from "../model/posts.model";
import { FilterType, PostListener } from "../model/shared-types";
import PostList from "../components/PostList";
import { RootDrawerParamList } from "./DrawerNavigator";
import { StackParamList } from "./StackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export interface TabNavigatorProps {
  posts: Post[];
  page: number;
  filter: FilterType;
  editedPost: Post;
  scrollIndex: number;
  onDelete: PostListener;
  onEdit: PostListener;
  onLoadMorePosts: () => void;
  onFavourite: PostListener;
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    MaterialTopTabScreenProps<RootTabParamList, Screen>,
    DrawerScreenProps<RootDrawerParamList>
  >;

// export type TabNavigatorScreenProps = DrawerScreenProps<RootDrawerParamList> & TabNavigatorProps;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

// export type TabNavigatorScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
//   MaterialTopTabScreenProps<RootTabParamList, Screen>,
//   DrawerScreenProps<RootDrawerParamList>
// > & TabNavigatorProps;

export type TabNavigatorScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, "Tabs">,
  DrawerScreenProps<RootDrawerParamList>
> &
  TabNavigatorProps;

const BottomTab = createMaterialTopTabNavigator<RootTabParamList>();

export function TabNavigator({
  navigation,
  route,
  ...rest
}: TabNavigatorScreenProps) {
  const colorScheme = useColorScheme();

  function showDetails(post: Post) {
    navigation.push("PostDetails", {
      postId: post.id!,
    });
  }

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "All Posts",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      >
        {(props) => <PostList showAllPosts={true} onDetails={showDetails} {...rest} />}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="TabTwo"
        options={{
          title: "Favourite Posts",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      >
        {(props) => <PostList showAllPosts={false} onDetails={showDetails} {...rest} />}
        </BottomTab.Screen>
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
