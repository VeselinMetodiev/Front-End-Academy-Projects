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
    const visibleUsers = (Users: User[], filter: FilterType) => Users.filter(User => !filter ? true : User.status === filter);
    const memoizedVisibleUsers = useMemo(() => visibleUsers(users, filter), [users, filter]);
    return (
        <FlatList<User> style={{width: '100%'}} data={memoizedVisibleUsers}
            renderItem={({ item: User }) => <UserItem user={User} key={User.id} {...rest} />}
        />);
}