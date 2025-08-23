import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getFollowRequests,
    acceptFollowRequest,
    rejectFollowRequest,
} from "../../store/actions/user.action";
import Toast from "../../components/common/Toast";
import { FaTrash } from "react-icons/fa";

const FollowRequests = () => {
    const dispatch = useDispatch();
    const { followRequests, loading, error } = useSelector((state) => state.user);

    const [loadingBtn, setLoadingBtn] = useState(null);
    const [confirmModal, setConfirmModal] = useState({ open: false, followerId: null });

    useEffect(() => {
        dispatch(getFollowRequests());
    }, [dispatch]);

    const handleAccept = (followerId) => {
        setLoadingBtn(followerId);
        setTimeout(() => {
            dispatch(acceptFollowRequest(followerId));
            setLoadingBtn(null);
            Toast.success("Request accepted.");
        }, 2000);
    };

    const handleReject = (followerId) => {
        setConfirmModal({ open: true, followerId }); 
    };

    const confirmReject = () => {
        if (!confirmModal.followerId) return;
        dispatch(rejectFollowRequest(confirmModal.followerId));
        Toast.success("Request deleted.");
        setConfirmModal({ open: false, followerId: null });
    };

    const cancelReject = () => {
        setConfirmModal({ open: false, followerId: null });
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
                        <li
                            key={req.id}
                            className="flex justify-between items-center border-b py-3"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={req.senderProfileImage || "/default-profile.png"}
                                    alt={req.senderName || req.senderUsername || "User"}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <span>
                                    {req.senderName || req.senderUsername || "Unknown User"}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleAccept(req.id)}
                                    disabled={loadingBtn === req.id}
                                    className="px-4 py-1 h-8 w-[93px] bg-[#0095F6] text-white rounded font-semibold hover:bg-[#1877F2] disabled:opacity-50"
                                >
                                    {loadingBtn === req.id ? (
                                        <div className="w-[18px] h-[18px] border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                                    ) : (
                                        "Confirm"
                                    )}
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

            {/* Confirm Modal */}
            {confirmModal.open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-lg shadow-lg px-6 py-8 w-110">
                        <FaTrash className="w-8 h-8 text-gray-400 mx-auto mb-4"/>
                        <h2 className="text-lg font-semibold mb-6 text-center">
                            Are you sure you want to delete request?
                        </h2>
                        <div className="flex justify-center gap-2">

                            <button
                                onClick={cancelReject}
                                className="px-4 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                            >
                                No , Cancel
                            </button>
                            <button
                                onClick={confirmReject}
                                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Yes , I'm Sure
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FollowRequests;
