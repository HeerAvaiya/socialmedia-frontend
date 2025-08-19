import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedPosts } from "../store/actions/post.action";
import PostCard from "../views/post/PostCard";

const Home = () => {
    const dispatch = useDispatch();

    const { feedPosts: posts = [], loading, error } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(getFeedPosts());
    }, [dispatch]);

    return (
        <div className="flex justify-center w-full bg-gray-50 min-h-screen">
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl py-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Home Feed</h1>

                {loading && <p className="text-gray-500 text-center">Loading posts...</p>}

                {!loading && error && <p className="text-red-500 text-center">{error}</p>}

                {!loading && !error && posts.length === 0 && (
                    <p className="text-gray-500 text-center">No posts to show</p>
                )}

                {!loading && !error && posts.length > 0 && (
                    <div className="flex flex-col gap-6">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} isFeed />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
