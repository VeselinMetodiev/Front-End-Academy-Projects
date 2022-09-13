import { forwardRef, useMemo, useRef, useEffect } from "react";
import { FlatList, View, Animated, Dimensions } from "react-native";
import { FilterType, IdType, PostListener } from "../model/shared-types";
import { Post } from "../model/posts.model";
import PostItem, { ITEM_HEIGHT, PostItemListener } from "./PostItem";
import { DEFAULT_PAGE_SIZE } from "./Main";

interface Props {
    posts: Post[];
    page: number;
    filter: FilterType;
    scrollIndex?: number;
    onDelete: PostListener;
    onEdit: PostListener;
    onFavourite: PostListener;
    onDetails: PostListener;
    onLoadMorePosts: () => void;
    showAllPosts: boolean;
}

type PostIdToAnimatedValueMap = {
    [id: number]: Animated.Value
}

const PostList = forwardRef<FlatList<Post>, Props>((props, fRef) => {
    const postsAnimatedValues = useRef<PostIdToAnimatedValueMap>([]).current;
    const { showAllPosts, posts, page, filter, scrollIndex, onLoadMorePosts, ...rest }: Props = props;
    const allPosts = showAllPosts ? posts : posts.filter((post) => post.isFavourite === true);
    const visiblePosts = (posts: Post[], filter: FilterType) => allPosts.filter(post => !filter ? true : post.status === filter);
    posts.map((post) => console.log(post.title + ' : ' + post.isFavourite))
    const memoizedVisiblePosts = useMemo(() => visiblePosts(posts, filter), [posts, filter]);
    console.log(memoizedVisiblePosts)

    useEffect(() => {
        addAnimatedValues(posts.slice((page - 1) * DEFAULT_PAGE_SIZE, page * DEFAULT_PAGE_SIZE))
    }, [page]);

    const addAnimatedValues = (newPosts: Post[]) => {
        newPosts.forEach(post => postsAnimatedValues[post.id!] = new Animated.Value(0));
        const newAnimations = newPosts.map((post) =>
            Animated.timing(postsAnimatedValues[post.id!], {
                toValue: 1,
                duration: 750,
                useNativeDriver: true,
            }));
        Animated.stagger(100, newAnimations).start();
    }

    const windowWidth = Dimensions.get('window').width;

    return (
        <FlatList<Post> ref={fRef} style={{ flex: 1, width: '100%' }} data={memoizedVisiblePosts}
            renderItem={({ item: post }) => {
                return <Animated.View style={{
                    opacity: postsAnimatedValues[post.id!],
                    marginLeft: postsAnimatedValues[post.id!]?.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-windowWidth, 0],
                        extrapolate: 'clamp',
                    }) ?? 0
                }}>
                    <PostItem post={post} key={post.id} {...rest} />
                </Animated.View>
            }
            }
            // initialScrollIndex={scrollIndex}
            removeClippedSubviews={false}
            getItemLayout={(data: Post[] | null | undefined, index: number) => (
                { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
            )}
            ItemSeparatorComponent={() => <View style={{ width: "100%", height: .7, backgroundColor: 'rgba( 52,52,52,1)' }} />}
            onEndReachedThreshold={0.1}
            onEndReached={onLoadMorePosts}
        />);
});

export default PostList;