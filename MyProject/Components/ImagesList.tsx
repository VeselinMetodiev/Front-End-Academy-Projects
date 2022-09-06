import React, { useMemo } from "react";
import { FlatList } from "react-native";
import { Views } from "../App";
import { ImageModel } from "../model/Image";
import { ImageListener } from "../model/shared-types";
import UserItem from "./ImageItem";

interface Props {
    images: ImageModel[];
    onUpdate: ImageListener;
    onDelete: ImageListener;
    onEdit: ImageListener;
    onDrop: any;
    onFavourite: (image: ImageModel) => void;
    currentView: Views;
}

export default function UserList({ images, onDrop, onFavourite, currentView, ...rest }: Props) {
    return (
        <FlatList<ImageModel> style={{width: '100%'}} data={images}
            renderItem={({ item: user }) => <UserItem currentView={currentView} onFavourite={onFavourite!} dropZoneHeight={100} id={user.id} image={user} onDrop={onDrop} key={user.id} {...rest} />}
        />);
}