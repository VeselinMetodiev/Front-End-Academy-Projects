import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { UserListener } from "../model/shared-types";
import { User } from "../model/user";

interface userItemProps {
  user: User;
  onUpdate: UserListener;
  onDelete: UserListener;
  onEdit: UserListener;
}

const userItem = ({ user, onUpdate, onDelete, onEdit }: userItemProps) => {

  return (
    <View style={styles.userItem}>
      <View style={styles.card}>
    <Text>{user.username}</Text>
    <View>
      <Text>{user.firstName + ' ' + user.lastName}</Text>
    </View>
    <Image source={{ uri: user.imageUrl }} />
    <View style={styles.userItemRight}>
         <FontAwesome.Button
              style={styles.button}
              name="times-circle"
              size={40}
              color="red"
              backgroundColor="transparent"
              onPress={() => onDelete(user)}
            />
        <FontAwesome.Button
          style={styles.button}
          name="pencil-square"
          size={40}
          color="gray"
          backgroundColor="transparent"
          onPress={() => onEdit(user)}
        />
        </View>
  </View>
    </View>
  );
};


export default userItem;

const styles = StyleSheet.create({
  userItem: {
    gap: 15,
    padding: 15,
    border: 10,
  },
  card: {
  },
  userItemRight: {
    flexDirection: "row",
    gap: 15,
    padding: 0,
    border: 1,
  },
  userItemStatus: {
    fontSize: 24,
  },
  button: {
    padding: 0,
    width: 50,
    height: 40,
  },
  avatars: {
    width: 66,
    height: 58,
    borderRadius: 100,
  },
});
