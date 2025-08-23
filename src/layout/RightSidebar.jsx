import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getDiscoverUsers,
    sendFollowRequest,
    cancelFollowRequest,
    unfollowUser,
} from "../store/actions/user.action";

const RightSidebar = () => {
    const dispatch = useDispatch();
    const { discoverUsers, loading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getDiscoverUsers("")); // fetch initial users
    }, [dispatch]);

    const handleFollowClick = (user) => {
        if (user.followStatus === "accepted") {
            dispatch(unfollowUser(user.id));
        } else if (user.followStatus === "none") {
            dispatch(sendFollowRequest(user.id));
        } else if (user.followStatus === "pending") {
            dispatch(cancelFollowRequest(user.id));
        }
    };

    // Show only 8 users
    const displayedUsers = discoverUsers.slice(0, 8);

    return (
        <aside className="w-80 border border-gray-200 bg-white right-4 top-20 p-4 overflow-y-auto">

            {loading && <p>Loading users...</p>}
            {!loading && displayedUsers.length === 0 && (
                <p className="text-gray-500">No users found.</p>
            )}

            <div className="space-y-3">
                {displayedUsers.map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center justify-between p-2 rounded border"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={user.profileImageUrl || "/default.png"}
                                alt={user.username}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className="font-medium">{user.username}</span>
                        </div>

                        <button
                            onClick={() => handleFollowClick(user)}
                            className={`px-3 py-1 text-sm rounded text-white
                                ${user.followStatus === "accepted"
                                    ? "bg-red-500 hover:bg-red-600"
                                    : user.followStatus === "pending"
                                        ? "bg-gray-500 hover:bg-gray-600"
                                        : "bg-blue-600 hover:bg-blue-700"}`}
                        >
                            {user.followStatus === "accepted"
                                ? "Unfollow"
                                : user.followStatus === "pending"
                                    ? "Cancel Request"
                                    : "Follow"}
                        </button>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default RightSidebar;