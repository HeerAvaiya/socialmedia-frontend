import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getDiscoverUsers,
    sendFollowRequest,
    unfollowUser,
} from "../../store/actions/user.action";

const Discover = () => {
    const dispatch = useDispatch();
    const { discoverUsers, loading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getDiscoverUsers());
    }, [dispatch]);

    const handleFollowClick = (user) => {
        if (user.followStatus === "accepted") {
            dispatch(unfollowUser(user.id));
        } else if (user.followStatus === "none") {
            dispatch(sendFollowRequest(user.id));
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Discover Users</h1>
            {loading && <p>Loading users...</p>}
            {!loading && discoverUsers.length === 0 && <p>No users to discover.</p>}
            <div className="space-y-4">
                {discoverUsers.map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center justify-between p-3 border rounded shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={user.profileImageUrl || "/default.png"}
                                alt={user.username}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <span className="font-medium">{user.username}</span>
                        </div>

                        {user.followStatus === "pending" ? (
                            <button
                                disabled
                                className="px-4 py-1 rounded text-white text-sm bg-gray-400 cursor-not-allowed"
                            >
                                Request Sent
                            </button>
                        ) : (
                            <button
                                onClick={() => handleFollowClick(user)}
                                className={`px-4 py-1 rounded text-white text-sm ${user.followStatus === "accepted"
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                {user.followStatus === "accepted" ? "Unfollow" : "Follow"}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Discover;
