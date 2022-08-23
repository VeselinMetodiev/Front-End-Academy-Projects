import React from "react";
import { UserListener } from "../model/shared-types";
import { User, UserStatus } from "../model/user.model";
import { StyleSheet, Text, View, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
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
      <Card style={styles.card}>
    <Card.Title title={user.username} subtitle={user.firstName + ' ' + user.lastName} left={undefined} />
    <Card.Content>
      <Title>{UserStatus[user.status]}</Title>
      <Paragraph>{user.description}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: user.pictureUrl }} />
    <Card.Actions>
    <View style={styles.userItemRight}>
        {user.status === UserStatus.ACTIVE ? (
            <FontAwesome.Button
              style={styles.button}
              name="dot-circle-o"
              size={40}
              color="orange"
              backgroundColor="transparent"
              onPress={handleUserDeactivation}
            />
        ) : (
          <FontAwesome.Button
            style={styles.button}
            name="check-circle"
            size={40}
            color="green"
            backgroundColor="transparent"
            onPress={handleUserActivation}
          />
        )}
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
    </Card.Actions>
  </Card>
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
