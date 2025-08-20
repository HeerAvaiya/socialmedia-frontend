import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getDiscoverUsers,
    sendFollowRequest,
    unfollowUser,
} from "../store/actions/user.action";

const RightSidebar = () => {
    const dispatch = useDispatch();
    const { discoverUsers, loading } = useSelector((state) => state.user);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const usersPerPage = 7; 
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            setCurrentPage(1);
        }, 400);
        return () => clearTimeout(handler);
    }, [search]);

    useEffect(() => {
        dispatch(getDiscoverUsers(debouncedSearch));
    }, [dispatch, debouncedSearch]);

    const handleFollowClick = (user) => {
        if (user.followStatus === "accepted") {
            dispatch(unfollowUser(user.id));
        } else if (user.followStatus === "none") {
            dispatch(sendFollowRequest(user.id));
        }
    };

    const totalUsers = discoverUsers.length;
    const totalPages = Math.ceil(totalUsers / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = discoverUsers.slice(indexOfFirstUser, indexOfLastUser);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <aside className="w-80 border border-gray-200 bg-white right-4 top-20 p-4 overflow-y-auto">

            {/* Users */}
            {loading && <p>Loading users...</p>}
            {!loading && discoverUsers.length === 0 && (
                <p className="text-gray-500">No users found.</p>
            )}

            <div className="space-y-3">
                {currentUsers.map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center justify-between p-2 rounded"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={user.profileImageUrl || "/default.png"}
                                alt={user.username}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className="font-medium">{user.username}</span>
                        </div>

                        {user.followStatus === "pending" ? (
                            <button
                                disabled
                                className="px-3 py-1 text-sm rounded bg-gray-400 text-white"
                            >
                                Sent
                            </button>
                        ) : (
                            <button
                                onClick={() => handleFollowClick(user)}
                                className={`px-3 py-1 text-sm rounded text-white ${user.followStatus === "accepted"
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                {user.followStatus === "accepted"
                                    ? "Unfollow"
                                    : "Follow"}
                            </button>
                        )}
                    </div>
                ))}
            </div>

        </aside>
    );
};

export default RightSidebar;
