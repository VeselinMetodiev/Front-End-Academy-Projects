import React, { Component } from "react";
import {
  GestureResponderEvent,
  Pressable,
  Text,
  TextStyle,
  View,
} from "react-native";
import { PostListener, TagListener } from "../model/shared-types";

interface IButtonProps {
  styleView: TextStyle;
  styleText: TextStyle;
  styleTextPressed: TextStyle;
  tags: string[];
  filterTags: string[];
  onFilter: (tags: string[])=> void;
}

export default class TagButton extends Component<IButtonProps, {}> {

    handleFilter = (tag:string) => {
        if(this.props.filterTags.includes(tag)){
            this.props.onFilter(this.props.filterTags.filter(tagF => tagF !== tag));
        } else {
            this.props.onFilter(this.props.filterTags.concat(tag));
        }

    }

  render() {
    const {
      styleView,
      styleText,
      styleTextPressed,
      tags,
      onFilter,
    }: IButtonProps = this.props;
    return (
      <View style={styleView}>
        {tags.map((tag) => (
          <Pressable key={tag} onPress={() => this.handleFilter(tag)}>
            {this.props.filterTags.includes(tag) ? 
            <Text key={tag} style={styleTextPressed}>
              {tag}
            </Text>
            :
            <Text key={tag} style={styleText}>
              {tag}
            </Text>
  }
          </Pressable>
        ))}
      </View>
    );
  }
}
