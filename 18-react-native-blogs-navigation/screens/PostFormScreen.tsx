import React, { Component } from "react";
import { View, Text, Button, StyleSheet, ViewStyle } from "react-native";
import { Form } from "../components/formbuilder/Form";
import { FormCancelListener, FormComponentConfigs, FormComponentListener } from "../components/formbuilder/form-types";
import { Post, PostStatus } from "../model/posts.model";
import * as yup from "yup";
import { DrawerItemProps } from "react-native-paper";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../navigation/DrawerNavigator";

type PostFormPropToCompKindMapping = {
  id: "FormReadonlyTextComponent";
  title: "FormTextComponent";
  content: "FormTextComponent";
  tags: "FormTextComponent";
  image: "FormImageComponent";
  status: "FormDropdownComponent";
  authorId: "FormTextComponent";
};


export interface PostFormParams {
  initialValue: Post;
  onSubmit: FormComponentListener<Post>;
  onCancel?: FormCancelListener;
  formId?: number;
  style?: ViewStyle;
}

type PostFormScreenProps = DrawerScreenProps<RootDrawerParamList, "PostsForm"> & PostFormParams;

export default function PostFormScreen({ navigation, route, ...rest }: PostFormScreenProps) {
  const postFormConfig: FormComponentConfigs<
    Post,
    PostFormPropToCompKindMapping
  > = {
    id: {
      componentKind: "FormReadonlyTextComponent",
      label: "ID",
    },
    title: {
      label: "Blog Title",
      validators: yup.string().min(3).max(40),
    },
    content: {
      label: "Blog Content",
      options: {
        multiline: true,
      },
      validators: yup.string().min(40).max(2048),
    },
    tags: {
      convertor: {
        fromString: (tags: string) => tags.split(/\W+/),
        toString: (tagsArray: string[]) => tagsArray.toString(),
      },
    },
    image: {
      componentKind: "FormImageComponent",
      label: "Blog Image URL",
      validators: yup.object().shape({
        uri: yup
          .string()
          .required()
          .test(
            "is-url",
            "${path} is not a valid URL",
            (value: string | undefined) =>
              !!value &&
              (value.startsWith("data") ||
                yup.string().url().isValidSync(value))
          ),
        localUri: yup.string(),
        format: yup.string().oneOf(["jpeg", "png", "webp"]),
        width: yup.number().integer().min(0),
        height: yup.number().integer().min(0),
      }),
    },
    status: {
      componentKind: "FormDropdownComponent",
      label: "Blog Status",
      options: {
        choices: [
          {
            label: PostStatus[PostStatus.Published],
            value: PostStatus.Published,
          },
          { label: PostStatus[PostStatus.Draft], value: PostStatus.Draft },
        ],
      },
    },
    authorId: {
      label: "Author ID",
      validators: yup.number().integer().positive(),
      convertor: {
        fromString: (value: string) => {
          const num = +value;
          return isNaN(num) ? 0 : num;
        },
        toString: (num: number) => num + "",
      },
    },
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Post Form Screen</Text>
      <Button title="Cancel" onPress={() => navigation.goBack()} />
      <Form<Post, PostFormPropToCompKindMapping>
        config={postFormConfig}
        // initialValue={new Post('Example Post', 'Example content ...', ['example', 'post'], 'https://www.publicdomainpictures.net/pictures/160000/velka/jeune-femme-poste-de-travail.jpg', 1)}
        {...rest}
      />
      ;
    </View>
  );
  }
  

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    padding: 20,
    alignSelf: "center",
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 28,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  errors: {
    padding: 5,
    fontSize: 20,
    border: 1,
    borderRadius: 5,
    backgroundColor: "#eecccc",
    color: "red",
    textAlign: "center",
  },
});
