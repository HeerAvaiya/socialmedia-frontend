import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedPosts } from "../store/actions/post.action";
import PostCard from "../views/post/PostCard";

const Home = () => {
    const dispatch = useDispatch();
    const { posts, loading } = useSelector((state) => state.post);
    console.log("posts from redux:", posts);

    useEffect(() => {
        dispatch(getFeedPosts());
    }, [dispatch]);

    return (
        <div className="py-6 px-4 max-w-[1500px] mx-auto">
            <h1 className="text-2xl font-bold mb-4">Home Feed</h1>

            {loading ? (
                <p className="text-gray-500">Loading posts...</p>
            ) : posts.length > 0 ? (
                <div className="space-y-4">
                    {/* {posts.map((post) => (
                        <PostCard key={post.id} postId={post.id} />
                    ))} */}
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No posts to show</p>
            )}
        </div>
    );
};

export default Home;
