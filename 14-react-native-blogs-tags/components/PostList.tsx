import { Component, ForwardedRef, forwardRef, useEffect, useMemo, useState } from "react";
import { Animated, FlatList, View } from "react-native";
import { FilterType, PostListener, TagListener } from "../model/shared-types";
import { Post } from "../model/posts.model";
import PostItem, { ITEM_HEIGHT, PostItemListener } from "./PostItem";
import React from "react";
import IconButton from "./IconButton";
import { DEFAULT_PAGE_SIZE } from "../App";

interface Props {
    posts: Post[];
    page: number;
    filter: FilterType;
    scrollIndex?: number;
    onDelete: PostListener;
    onEdit: PostListener;
    onFilter: (tags: string[])=> void;
    filterTags: string[];
    onCancelTags: any,
    onLoadMorePosts: any
}
let postsAnimatedValues: Animated.Value[] = [];

const PostList = forwardRef<FlatList<Post>, Props>((props, fRef) => {
    const { posts, filter, scrollIndex,filterTags, onCancelTags, page, ...rest }: Props = props;
    const visiblePosts = (posts: Post[], filterTags: string[]) => posts.filter(post =>{
        for(const tagI in filterTags){
            if(!post.tags.includes(filterTags[tagI]))
                return false
        }
        return true;
    })
    const memoizedVisiblePosts = useMemo(() => visiblePosts(posts, filterTags), [posts, filterTags]);
    

    useEffect(() => {
        addAnimatedValues(posts.slice((page - 1) * DEFAULT_PAGE_SIZE, page * DEFAULT_PAGE_SIZE))
    }, [page]);

    const addAnimatedValues = (newItems: Post[]) => {
        newItems.forEach(item => postsAnimatedValues.push(new Animated.Value(0)));
        const newAnimations = newItems.map((val, index) =>
            Animated.timing(postsAnimatedValues[index + (page-1) * DEFAULT_PAGE_SIZE], {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }));
        Animated.stagger(100, newAnimations).start();
    }
    
    return (
        <FlatList<Post> ref={fRef} style={{ flex:1, width: '100%' }} data={memoizedVisiblePosts} ListHeaderComponent={
            <IconButton size={30} backgroundColor="orange" color="white" onPress={onCancelTags} name='check-circle' >
            Cancel Tags
          </IconButton>
        }
            stickyHeaderIndices={[0]}
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
