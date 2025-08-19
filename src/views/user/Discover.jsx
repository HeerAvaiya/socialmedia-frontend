import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getDiscoverUsers,
    sendFollowRequest,
    unfollowUser,
} from "../../store/actions/user.action";

const Discover = () => {
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
        }, 500);
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

    const getPaginationNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(
                    1,
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                    totalPages
                );
            }
        }
        return pages;
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Discover Users</h1>

            {/* Search bar */}
            <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 border rounded mb-6"
            />

            {loading && <p>Loading users...</p>}
            {!loading && discoverUsers.length === 0 && (
                <p>No users to discover.</p>
            )}

            <div className="space-y-4">
                {currentUsers.map((user) => (
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

            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        onClick={() => goToPage(1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        «
                    </button>
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        ‹
                    </button>

                    {getPaginationNumbers().map((num, idx) =>
                        num === "..." ? (
                            <span key={idx} className="px-3 py-1">
                                ...
                            </span>
                        ) : (
                            <button
                                key={idx}
                                onClick={() => goToPage(num)}
                                className={`px-3 py-1 border rounded ${currentPage === num
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-gray-200"
                                    }`}
                            >
                                {num}
                            </button>
                        )
                    )}

                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        ›
                    </button>
                    <button
                        onClick={() => goToPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        »
                    </button>
                </div>
            )}
        </div>
    );
};

export default Discover;
