import { Component, ForwardedRef, forwardRef, useEffect, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { FilterType, PostListener, TagListener } from "../model/shared-types";
import { Post } from "../model/posts.model";
import PostItem, { ITEM_HEIGHT, PostItemListener } from "./PostItem";

interface Props {
    posts: Post[];
    filter: FilterType;
    scrollIndex?: number;
    onDelete: PostListener;
    onEdit: PostListener;
    onFilter: (tags: string[])=> void;
    filterTags: string[];
}

const PostList = forwardRef<FlatList<Post>, Props>((props, fRef) => {
    const [selectedTag, setSelectedTag] = useState('');

   

    const { posts, filter, scrollIndex,filterTags, ...rest }: Props = props;
    const visiblePosts = (posts: Post[], filter: string[]) => posts.filter(post =>{
        for(const tagI in filter){
            if(!post.tags.includes(filter[tagI]))
                return false
        }
        return true;
    })
    const memoizedVisiblePosts = useMemo(() => visiblePosts(posts, filterTags), [posts, filterTags]);
    return (
        <FlatList<Post> ref={fRef} style={{ flex:1, width: '100%' }} data={memoizedVisiblePosts}
            renderItem={({ item: post }) => <PostItem post={post} key={post.id}  filterTags={filterTags}  {...rest} />}
            // initialScrollIndex={scrollIndex}
            removeClippedSubviews={false}
            getItemLayout={(data: Post[] | null | undefined, index: number) => (
                { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
            )}
            ItemSeparatorComponent={ () => <View style={ { width:"100%", height: .7, backgroundColor: 'rgba( 52,52,52,1)' } } /> }
        />);
});

export default PostList;
