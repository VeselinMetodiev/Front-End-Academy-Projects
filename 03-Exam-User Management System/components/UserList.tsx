import React, { useMemo } from "react";
import { FlatList } from "react-native";
import { UserListener } from "../model/shared-types";
import { User } from "../model/user";
import UserItem from "./UserItem";

interface Props {
    users: User[];
    onUpdate: UserListener;
    onDelete: UserListener;
    onEdit: UserListener;
}

export default function UserList({ users, ...rest }: Props) {
    return (
        <FlatList<User> style={{width: '100%'}} data={users}
            renderItem={({ item: user }) => <UserItem user={user} key={user.id} {...rest} />}
        />);
}