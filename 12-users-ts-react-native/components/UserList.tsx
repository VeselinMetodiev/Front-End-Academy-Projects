import React, { useMemo } from "react";
import { FlatList } from "react-native";
import { FilterType, UserListener } from "../model/shared-types";
import { User, UserStatus } from "../model/User.model";
import UserItem from "./UserItem";

interface Props {
    users: User[];
    filter: FilterType;
    onUpdate: UserListener;
    onDelete: UserListener;
    onEdit: UserListener;
}

export default function UserList({ users, filter, ...rest }: Props) {
    const visibleUsers = (users: User[], filter: FilterType) => users.filter(user => !filter ? true : user.status === filter);
    const memoizedVisibleUsers = useMemo(() => visibleUsers(users, filter), [users, filter]);
    return (
        <FlatList<User> style={{width: '100%'}} data={memoizedVisibleUsers}
            renderItem={({ item: user }) => <UserItem user={user} key={user.id} {...rest} />}
        />);
}