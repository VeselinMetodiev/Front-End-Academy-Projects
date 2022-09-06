import React, { useMemo } from "react";
import { FlatList } from "react-native";
import { ImageModel } from "../model/Image";
import { ImageListener } from "../model/shared-types";
import UserItem from "./ImageItem";

interface Props {
    images: ImageModel[];
    onUpdate: ImageListener;
    onDelete: ImageListener;
    onEdit: ImageListener;
    onDrop: any;
    onFavourite?: (image: ImageModel) => void
}

export default function UserList({ images, onDrop, onFavourite, ...rest }: Props) {
    return (
        <FlatList<ImageModel> style={{width: '100%'}} data={images}
            renderItem={({ item: user }) => <UserItem onFavourite={onFavourite!} dropZoneHeight={1000} id={user.id} image={user} onDrop={onDrop} key={user.id} {...rest} />}
        />);
}