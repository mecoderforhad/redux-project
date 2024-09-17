import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import PostsExcerpt from "./PostsExcerpt";
import { fetchPosts, getPostsError, getPostsStatus, selectAllPosts } from "../features/posts/postsSlice";
import { RootState } from "../store/store";

const PostsList = () => {
    console.log("from post list====>")
    const dispatch = useDispatch();
    const postStatus = useSelector((state: RootState) => state.postsSlice.status);
    const posts = useSelector((state: RootState) => state.postsSlice.posts);
    const error = useSelector((state: RootState) => state.postsSlice.error);

    console.log("post starts");
    console.log("postStatus", postStatus);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    console.log("post End")

    let content;
    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )
}
export default PostsList