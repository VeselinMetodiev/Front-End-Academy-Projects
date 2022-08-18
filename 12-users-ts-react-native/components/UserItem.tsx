import React from "react";
import { UserListener } from "../model/shared-types";
import { User, UserStatus } from "../model/user.model"
import { Button, StyleSheet, Text, View, } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface userItemProps {
    user: User;
    onUpdate: UserListener;
    onDelete: UserListener;
    onEdit: UserListener;
}

const userItem = ({ user, onUpdate, onDelete, onEdit }: userItemProps) => {
    function handleCompletion() {
        onUpdate({ ...user, status: UserStatus.ACTIVE})
    }
    return (
        <View style={styles.userItem}>
            <Text style={styles.userText}>
                {user.id} {user.firstName} - {user.lastName}
            </Text>

            <View style={styles.userItemRight}>
                <Text style={styles.userItemStatus}>{UserStatus[user.status].substring(0, 1)}</Text>
                {user.status === UserStatus.ACTIVE ?
                    <FontAwesome.Button style={styles.button} name="check-circle" size={40} color="green" backgroundColor='transparent'
                        onPress={handleCompletion} /> :
                    // <Button color="green" onPress={handleCompletion} title='Complete'/> :
                    <FontAwesome.Button style={styles.button} name="times-circle" size={40} color="red" backgroundColor='transparent'
                        onPress={() => onDelete(user)} />
                }
                <FontAwesome.Button style={styles.button} name="pencil-square" size={40} color="gray" backgroundColor='transparent'
                    onPress={() => onEdit(user)} />
            </View>
        </View >
    )
}

export default userItem

const styles = StyleSheet.create({
    userItem: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        gap: 15,
        padding: 5,
        backgroundImage: 'gray',
        border: 1,
    },
    userText: {
        width: '65%',
        fontSize: 24,
    },
    userItemId: {
        paddingRight: 10,
        fontSize: 24,
    },
    userItemRight: {
        width: '35%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
        padding: 0,
        backgroundImage: 'gray',
        border: 1
    },
    userItemStatus: {
        fontSize: 24,
    },
    button: {
        padding: 0,
        width: 50,
        height: 40,
    }
});