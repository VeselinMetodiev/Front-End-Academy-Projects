import React from "react";
import { UserListener } from "../model/shared-types";
import { User, UserStatus } from "../model/user.model";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { UsersAPI } from "../dao/rest-api-client";

interface userItemProps {
  user: User;
  onUpdate: UserListener;
  onDelete: UserListener;
  onEdit: UserListener;
}

const userItem = ({ user, onUpdate, onDelete, onEdit }: userItemProps) => {
  function handleUserDeactivation() {
    onUpdate({ ...user, status: UserStatus.DEACTIVATED });
    updateUserStatus(user, UserStatus.DEACTIVATED);
  }

  function handleUserSuspension() {
    onUpdate({ ...user, status: UserStatus.SUSPENDED });
    updateUserStatus(user, UserStatus.SUSPENDED);
  }

  function handleUserActivation() {
    onUpdate({ ...user, status: UserStatus.ACTIVE });
    updateUserStatus(user, UserStatus.ACTIVE);
  }

  function updateUserStatus(user: User, status: UserStatus) {
    user.status = status;
    UsersAPI.update(user);
  }
  return (
    <View style={styles.userItem}>
      <Text style={styles.userText}>
        {user.id} {user.username}
      </Text>
      <View style={styles.userItemLeft}>
      <Image style={styles.avatars} source={{ uri: user.pictureUrl }} />
      <Text style={styles.userItemStatus}>
          {UserStatus[user.status].substring(0,1)}
        </Text>
        </View>
      <View style={styles.userItemRight}>
        {user.status === UserStatus.ACTIVE ? (
          <>
            <FontAwesome.Button
              style={styles.button}
              name="check-circle"
              size={40}
              color="green"
              backgroundColor="transparent"
              onPress={handleUserDeactivation}
            />
            <FontAwesome.Button
              style={styles.button}
              name="times-circle"
              size={40}
              color="red"
              backgroundColor="transparent"
              onPress={() => onDelete(user)}
            />
          </>
        ) : (
            <>
          <FontAwesome.Button
            style={styles.button}
            name="check-circle"
            size={40}
            color="green"
            backgroundColor="transparent"
            onPress={handleUserActivation}
          />
          </>
        )}
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
  );
};

export default userItem;

const styles = StyleSheet.create({
  userItem: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 15,
    padding: 5,
    backgroundImage: "gray",
    border: 1,
  },
  userText: {
    width: '20%',
    fontSize: 26,
  },
  userItemId: {
    paddingRight: 10,
    fontSize: 24,
  },
  userItemRight: {
    width: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    padding: 0,
    backgroundImage: "gray",
    border: 1,
  },
  userItemLeft: {
    width: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    padding: 0,
    backgroundImage: "gray",
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
