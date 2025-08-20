import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getFollowRequests,
    acceptFollowRequest,
    rejectFollowRequest,
} from "../../store/actions/user.action";

const FollowRequests = () => {
    const dispatch = useDispatch();
    const { followRequests, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getFollowRequests());
    }, [dispatch]);

    const handleAccept = (followerId) => {
        dispatch(acceptFollowRequest(followerId));
    };

    const handleReject = (followerId) => {
        dispatch(rejectFollowRequest(followerId));
    };

    if (loading) return <p>Loading follow requests...</p>;
    if (error) return <p className="text-red-600">Error: {error}</p>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Follow Requests</h1>
            {followRequests.length === 0 ? (
                <p>No pending follow requests</p>
            ) : (
                <ul>
                    {followRequests.map((req) => (
                        <li key={req.id} className="flex justify-between items-center border-b py-3">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={req.senderProfileImage || "/default-profile.png"}
                                    alt={req.senderName || req.senderUsername || "User"}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <span>{req.senderName || req.senderUsername || "Unknown User"}</span>
                            </div>

                            <div className="space-x-2">
                                <button
                                    onClick={() => handleAccept(req.id)}
                                    className="px-4 py-1 bg-[#0095F6] text-white rounded font-semibold hover:bg-[#1877F2]"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => handleReject(req.id)}
                                    className="px-4 py-1 bg-[#EFEFEF] text-black rounded font-semibold hover:bg-[#DBDBDB]"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FollowRequests;
