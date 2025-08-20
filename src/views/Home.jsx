import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedPosts } from "../store/actions/post.action";
import PostCard from "../views/post/PostCard";
import RightSidebar from "../layout/RightSidebar";

const Home = () => {
    const dispatch = useDispatch();
    const { feedPosts: posts = [], loading, error } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(getFeedPosts());
    }, [dispatch]);

    return (
        <div className="ml-[255px] w-[calc(100%-255px)] bg-gray-50 min-h-screen">
            {/* Main Content Container */}
            <div className="flex w-full gap-8 py-6 px-4 justify-center">

                {/* 🔹 Posts Section */}
                <div className="flex-1 max-w-[470px]">
                    {loading && <p className="text-gray-500 text-center">Loading posts...</p>}

                    {!loading && error && <p className="text-red-500 text-center">{error}</p>}

                    {!loading && !error && posts.length === 0 && (
                        <p className="text-gray-500 text-center">No posts to show</p>
                    )}

                    {!loading && !error && posts.length > 0 && (
                        <div className="flex flex-col gap-6">
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="bg-white shadow rounded-lg overflow-hidden"
                                >
                                    {/* 🔹 User Info */}
                                    {post.creator && (
                                        <div className="flex items-center gap-3 p-3 border-b border-gray-200">
                                            <img
                                                src={post.creator.profileImageUrl || "/default.png"}
                                                alt={post.creator.username}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <span className="font-semibold">
                                                {post.creator.username}
                                            </span>
                                        </div>
                                    )}

                                    {/* 🔹 Post Content */}
                                    <PostCard imgClass="h-100" post={post} isFeed />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 🔹 Right Sidebar (Hide on small screens) */}
                <div className="hidden lg:block w-[320px]">
                    <RightSidebar />
                </div>
            </div>
        </div>
    );
};

export default Home;
