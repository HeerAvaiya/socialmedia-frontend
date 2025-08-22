
////working with searchbar (yesterday)
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     getDiscoverUsers,
//     sendFollowRequest,
//     unfollowUser,
// } from "../../store/actions/user.action";

// const Discover = () => {
//     const dispatch = useDispatch();
//     const { discoverUsers, loading } = useSelector((state) => state.user);

//     const [search, setSearch] = useState("");
//     const [debouncedSearch, setDebouncedSearch] = useState("");

//     const [currentPage, setCurrentPage] = useState(1);
//     const usersPerPage = 6;

//     useEffect(() => {
//         const handler = setTimeout(() => {
//             setDebouncedSearch(search);
//             setCurrentPage(1);
//         }, 500);
//         return () => clearTimeout(handler);
//     }, [search]);

//     useEffect(() => {
//         dispatch(getDiscoverUsers(debouncedSearch));
//     }, [dispatch, debouncedSearch]);

//     const handleFollowClick = (user) => {
//         if (user.followStatus === "accepted") {
//             dispatch(unfollowUser(user.id));
//         } else if (user.followStatus === "none") {
//             dispatch(sendFollowRequest(user.id));
//         }
//     };

//     const totalUsers = discoverUsers.length;
//     const totalPages = Math.ceil(totalUsers / usersPerPage);

//     const indexOfLastUser = currentPage * usersPerPage;
//     const indexOfFirstUser = indexOfLastUser - usersPerPage;
//     const currentUsers = discoverUsers.slice(indexOfFirstUser, indexOfLastUser);

//     const goToPage = (page) => {
//         if (page >= 1 && page <= totalPages) setCurrentPage(page);
//     };

//     const getPaginationNumbers = () => {
//         const pages = [];
//         if (totalPages <= 5) {
//             for (let i = 1; i <= totalPages; i++) pages.push(i);
//         } else {
//             if (currentPage <= 3) {
//                 pages.push(1, 2, 3, "...", totalPages);
//             } else if (currentPage >= totalPages - 2) {
//                 pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
//             } else {
//                 pages.push(
//                     1,
//                     "...",
//                     currentPage - 1,
//                     currentPage,
//                     currentPage + 1,
//                     "...",
//                     totalPages
//                 );
//             }
//         }
//         return pages;
//     };

//     return (
//         <div className="p-6 max-w-md mx-auto">
//             <h1 className="text-2xl font-bold mb-6 text-center">Search Users</h1>

//             {/* Search bar */}
//             <input
//                 type="text"
//                 placeholder="Search users..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full p-2 border rounded mb-6"
//             />

//             {loading && <p>Loading users...</p>}
//             {!loading && discoverUsers.length === 0 && (
//                 <p>No users to discover.</p>
//             )}

//             <div className="space-y-4">
//                 {currentUsers.map((user) => (
//                     <div
//                         key={user.id}
//                         className="flex items-center justify-between p-3 border rounded shadow-sm"
//                     >
//                         <div className="flex items-center gap-4">
//                             <img
//                                 src={user.profileImageUrl || "/default.png"}
//                                 alt={user.username}
//                                 className="w-12 h-12 rounded-full object-cover"
//                             />
//                             <span className="font-medium">{user.username}</span>
//                         </div>

//                         {user.followStatus === "pending" ? (
//                             <button
//                                 disabled
//                                 className="px-4 py-1 rounded text-white text-sm bg-gray-400 cursor-not-allowed"
//                             >
//                                 Request Sent
//                             </button>
//                         ) : (
//                             <button
//                                 onClick={() => handleFollowClick(user)}
//                                 className={`px-4 py-1 rounded text-white text-sm ${user.followStatus === "accepted"
//                                     ? "bg-red-500 hover:bg-red-600"
//                                     : "bg-blue-600 hover:bg-blue-700"
//                                     }`}
//                             >
//                                 {user.followStatus === "accepted" ? "Unfollow" : "Follow"}
//                             </button>
//                         )}
//                     </div>
//                 ))}
//             </div>

//             {/* Pagination controls */}
//             {totalPages > 1 && (
//                 <div className="flex justify-center items-center gap-2 mt-6">
//                     <button
//                         onClick={() => goToPage(1)}
//                         disabled={currentPage === 1}
//                         className="px-3 py-1 border rounded disabled:opacity-50"
//                     >
//                         «
//                     </button>
//                     <button
//                         onClick={() => goToPage(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         className="px-3 py-1 border rounded disabled:opacity-50"
//                     >
//                         ‹
//                     </button>

//                     {getPaginationNumbers().map((num, idx) =>
//                         num === "..." ? (
//                             <span key={idx} className="px-3 py-1">
//                                 ...
//                             </span>
//                         ) : (
//                             <button
//                                 key={idx}
//                                 onClick={() => goToPage(num)}
//                                 className={`px-3 py-1 border rounded ${currentPage === num
//                                     ? "bg-blue-600 text-white"
//                                     : "hover:bg-gray-200"
//                                     }`}
//                             >
//                                 {num}
//                             </button>
//                         )
//                     )}

//                     <button
//                         onClick={() => goToPage(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                         className="px-3 py-1 border rounded disabled:opacity-50"
//                     >
//                         ›
//                     </button>
//                     <button
//                         onClick={() => goToPage(totalPages)}
//                         disabled={currentPage === totalPages}
//                         className="px-3 py-1 border rounded disabled:opacity-50"
//                     >
//                         »
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Discover;

















////remove pagination and discover user 
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     getDiscoverUsers,
//     sendFollowRequest,
//     unfollowUser,
// } from "../../store/actions/user.action";

// const Discover = () => {
//     const dispatch = useDispatch();
//     const { discoverUsers, loading } = useSelector((state) => state.user);

//     const [search, setSearch] = useState("");
//     const [debouncedSearch, setDebouncedSearch] = useState("");
//     const [hiddenUsers, setHiddenUsers] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const usersPerPage = 6;
//     const handleHideUser = (id) => {
//         setHiddenUsers((prev) => [...prev, id]);
//     };
//     useEffect(() => {
//         const handler = setTimeout(() => {
//             setDebouncedSearch(search);
//             setCurrentPage(1);
//         }, 500);
//         return () => clearTimeout(handler);
//     }, [search]);

//     useEffect(() => {
//         if (debouncedSearch.trim()) {
//             dispatch(getDiscoverUsers(debouncedSearch));
//         }
//     }, [dispatch, debouncedSearch]);

//     const handleFollowClick = (user) => {
//         if (user.followStatus === "accepted") {
//             dispatch(unfollowUser(user.id));
//         } else if (user.followStatus === "none") {
//             dispatch(sendFollowRequest(user.id));
//         }
//     };

//     const totalUsers = discoverUsers.length;
//     const totalPages = Math.ceil(totalUsers / usersPerPage);

//     const indexOfLastUser = currentPage * usersPerPage;
//     const indexOfFirstUser = indexOfLastUser - usersPerPage;
//     const currentUsers = discoverUsers.slice(indexOfFirstUser, indexOfLastUser);

//     const goToPage = (page) => {
//         if (page >= 1 && page <= totalPages) setCurrentPage(page);
//     };

//     const getPaginationNumbers = () => {
//         const pages = [];
//         if (totalPages <= 5) {
//             for (let i = 1; i <= totalPages; i++) pages.push(i);
//         } else {
//             if (currentPage <= 3) {
//                 pages.push(1, 2, 3, "...", totalPages);
//             } else if (currentPage >= totalPages - 2) {
//                 pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
//             } else {
//                 pages.push(
//                     1,
//                     "...",
//                     currentPage - 1,
//                     currentPage,
//                     currentPage + 1,
//                     "...",
//                     totalPages
//                 );
//             }
//         }
//         return pages;
//     };

//     return (
//         <div className="p-6 max-w-md mx-auto">
//             <h1 className="text-2xl font-bold mb-6 text-center">Search Users</h1>

//             {/* Search bar */}
//             <input
//                 type="text"
//                 placeholder="Search users..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full p-2 border rounded mb-6"
//             />



//             <div className="space-y-4">
//                 {!loading && !debouncedSearch && (
//                     <p className="text-center text-gray-500"></p>
//                 )}
//                 {loading && <p>Loading users...</p>}
//                 {!loading && debouncedSearch && discoverUsers.length === 0 && (
//                     <p>No users found.</p>
//                 )}

//                 {currentUsers.map((user) => (
//                     <div
//                         key={user.id}
//                         className="flex items-center justify-between p-3 border rounded shadow-sm"
//                     >
//                         <div className="flex items-center gap-4">
//                             <img
//                                 src={user.profileImageUrl || "/default.png"}
//                                 alt={user.username}
//                                 className="w-12 h-12 rounded-full object-cover"
//                             />
//                             <span className="font-medium">{user.username}</span>
//                         </div>

//                         {user.followStatus === "pending" ? (
//                             <button
//                                 disabled
//                                 className="px-4 py-1 rounded text-white text-sm bg-gray-400 cursor-not-allowed"
//                             >
//                                 Request Sent
//                             </button>
//                         ) : (
//                             <button
//                                 onClick={() => handleFollowClick(user)}
//                                 className={`px-4 py-1 rounded text-white text-sm ${user.followStatus === "accepted"
//                                     ? "bg-red-500 hover:bg-red-600"
//                                     : "bg-blue-600 hover:bg-blue-700"
//                                     }`}
//                             >
//                                 {user.followStatus === "accepted" ? "Unfollow" : "Follow"}
//                             </button>
//                         )}
//                     </div>
//                 ))}



//                 {/* 
//                 {currentUsers
//                     .filter((user) => !hiddenUsers.includes(user.id))
//                     .map((user) => (
//                         <div
//                             key={user.id}
//                             className="flex items-center justify-between bg-white shadow rounded-lg p-3"
//                         >
//                             <div className="flex items-center space-x-3">
//                                 <img
//                                     src={user.profileImageUrl || "/default-avatar.png"}
//                                     alt={user.username}
//                                     className="w-10 h-10 rounded-full object-cover"
//                                 />
//                                 <span className="font-medium text-gray-800">{user.username}</span>
//                             </div>

//                             <div className="flex items-center space-x-2">
//                                 <button
//                                     onClick={() => handleFollow(user.id)}
//                                     className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                                 >
//                                     Follow
//                                 </button>
//                                 <button
//                                     onClick={() => handleHideUser(user.id)}
//                                     className="px-2 py-1 text-red-500 hover:text-red-700"
//                                 >
//                                     ✖
//                                 </button>
//                             </div>
//                         </div>
//                     ))} */}
//             </div>
//         </div>
//     );
// };

// export default Discover;


















// ////follow button not working
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     getDiscoverUsers,
//     sendFollowRequest,
//     unfollowUser,
// } from "../../store/actions/user.action";

// const Discover = () => {
//     const dispatch = useDispatch();
//     const { discoverUsers, loading } = useSelector((state) => state.user);

//     const [search, setSearch] = useState("");
//     const [hiddenUsers, setHiddenUsers] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const usersPerPage = 6;

//     const handleHideUser = (id) => {
//         setHiddenUsers((prev) => [...prev, id]);
//     };

//     // 👉 whenever search changes
//     useEffect(() => {
//         if (search.trim()) {
//             dispatch(getDiscoverUsers(search.trim()));
//             setCurrentPage(1);
//         }
//     }, [dispatch, search]);

//     const handleFollowClick = (user) => {
//         if (user.followStatus === "accepted") {
//             dispatch(unfollowUser(user.id));
//         } else if (user.followStatus === "none") {
//             dispatch(sendFollowRequest(user.id));
//         }
//     };

//     const totalUsers = discoverUsers.length;
//     const totalPages = Math.ceil(totalUsers / usersPerPage);

//     const indexOfLastUser = currentPage * usersPerPage;
//     const indexOfFirstUser = indexOfLastUser - usersPerPage;
//     const currentUsers = discoverUsers.slice(indexOfFirstUser, indexOfLastUser);


//     return (
//         <div className="p-6 max-w-md mx-auto">
//             <h1 className="text-2xl font-bold mb-6 text-center">Search Users</h1>

//             {/* Search bar */}
//             <input
//                 type="text"
//                 placeholder="Search users..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full p-2 border rounded mb-6"
//             />

//             <div className="space-y-4">
//                 {loading && <p>Loading users...</p>}
//                 {!loading && search && discoverUsers.length === 0 && (
//                     <p>No users found.</p>
//                 )}

//                 {search &&
//                     currentUsers
//                         .filter((user) => !hiddenUsers.includes(user.id))
//                         .map((user) => (
//                             <div
//                                 key={user.id}
//                                 className="flex items-center justify-between bg-white shadow rounded-lg p-3"
//                             >
//                                 <div className="flex items-center space-x-3">
//                                     <img
//                                         src={user.profileImageUrl || "/default-avatar.png"}
//                                         alt={user.username}
//                                         className="w-10 h-10 rounded-full object-cover"
//                                     />
//                                     <span className="font-medium text-gray-800">
//                                         {user.username}
//                                     </span>
//                                 </div>

//                                 <div className="flex items-center space-x-2">
//                                     <button
//                                         onClick={() => handleFollowClick(user)}
//                                         className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                                     >
//                                         {user.followStatus === "accepted"
//                                             ? "Unfollow"
//                                             : "Follow"}
//                                     </button>
//                                     <button
//                                         onClick={() => handleHideUser(user.id)}
//                                         className="px-2 py-1 text-red-500 hover:text-red-700"
//                                     >
//                                         ✖
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//             </div>
//         </div>
//     );
// };

// export default Discover;
















////try cancel button
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getDiscoverUsers,
    sendFollowRequest,
    unfollowUser,
    cancelFollowRequest,
} from "../../store/actions/user.action";

const Discover = () => {
    const dispatch = useDispatch();
    const { discoverUsers, loading } = useSelector((state) => state.user);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 6;

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
            // unfollow user
            dispatch(unfollowUser(user.id));
        } else if (user.followStatus === "none") {
            if (user.isPrivate) {
                // private account → send request
                dispatch(sendFollowRequest(user.id));
            } else {
                // public account → direct follow
                dispatch(sendFollowRequest(user.id, { autoAccept: true }));
            }
        } else if (user.followStatus === "pending") {
            // cancel request if already sent
            dispatch(cancelFollowRequest(user.id));
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
            <h1 className="text-2xl font-bold mb-6 text-center">Search Users</h1>

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

                        {/* Button Logic */}
                        {user.followStatus === "pending" ? (
                            <button
                                onClick={() => handleFollowClick(user)}
                                className="px-4 py-1 rounded text-white text-sm bg-gray-500 hover:bg-gray-600"
                            >
                                Cancel Request
                            </button>
                        ) : user.followStatus === "accepted" ? (
                            <button
                                onClick={() => handleFollowClick(user)}
                                className="px-4 py-1 rounded text-white text-sm bg-red-500 hover:bg-red-600"
                            >
                                Unfollow
                            </button>
                        ) : (
                            <button
                                onClick={() => handleFollowClick(user)}
                                className="px-4 py-1 rounded text-white text-sm bg-blue-600 hover:bg-blue-700"
                            >
                                Follow
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
