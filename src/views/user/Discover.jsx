import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getDiscoverUsers,
    sendFollowRequest,
    cancelFollowRequest,
    unfollowUser,
} from "../../store/actions/user.action";

const Discover = () => {
    const dispatch = useDispatch();
    const { discoverUsers, loading } = useSelector((state) => state.user);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search.trim());
        }, 500);
        return () => clearTimeout(handler);
    }, [search]);

    useEffect(() => {
        if (debouncedSearch !== "") {
            dispatch(getDiscoverUsers(debouncedSearch));
        }
    }, [dispatch, debouncedSearch]);

    const handleFollowClick = (user) => {
        if (user.followStatus === "accepted") {
            dispatch(unfollowUser(user.id));
        } else if (user.followStatus === "none") {
            dispatch(sendFollowRequest(user.id));
        } else if (user.followStatus === "pending") {
            dispatch(cancelFollowRequest(user.id));
        }
    };

    const filteredUsers = debouncedSearch
        ? discoverUsers.filter((u) =>
            u.username.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
        : [];

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Search Users</h1>

            <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 border rounded mb-6"
            />

            {loading && <p>Loading users...</p>}

            {!loading && debouncedSearch !== "" && filteredUsers.length === 0 && (
                <p>No users found.</p>
            )}

            <div className="space-y-4">
                {filteredUsers.map((user) => (
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

                        <button
                            onClick={() => handleFollowClick(user)}
                            className={`px-4 py-1 rounded text-white text-sm ${user.followStatus === "accepted"
                                    ? "bg-red-500 hover:bg-red-600"
                                    : user.followStatus === "pending"
                                        ? "bg-gray-500 hover:bg-gray-600"
                                        : "bg-blue-600 hover:bg-blue-700"
                                }`}
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
        </div>
    );
};

export default Discover;
