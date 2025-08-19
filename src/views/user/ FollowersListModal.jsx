import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FollowersListModal = ({ type, onClose }) => {
    const navigate = useNavigate();
    const { followers = [], following = [], user: authUser } = useSelector((s) => s.user);

    const data = type === "followers" ? followers : following;

    const getId = (u) => u?.id || u?._id || u?.userId;

    const handleGoProfile = (u) => {
        const id = getId(u);
        if (!id) return;
        onClose();
        navigate(`/profile/${id}`);
    };

    const list = useMemo(() => data || [], [data]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm max-h-[80vh] overflow-hidden flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h3 className="text-lg font-semibold capitalize">{type}</h3>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="p-1 rounded-full hover:bg-gray-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto">
                    {list.length === 0 ? (
                        <div className="p-6 text-center text-sm text-gray-500">No {type} found</div>
                    ) : (
                        <ul>
                            {list.map((u) => {
                                const uid = getId(u);
                                const name = u?.fullName || u?.name || "";
                                const profileImage =
                                    u?.profileImageUrl?.trim() ||
                                    u?.profileImage?.trim() ||
                                    "/default.png";

                                return (
                                    <li
                                        key={uid || Math.random()}
                                        className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                                    >
                                        <div
                                            className="flex items-center gap-3 cursor-pointer"
                                            onClick={() => handleGoProfile(u)}
                                        >
                                            <img
                                                src={profileImage}
                                                alt={u?.username || name || "user"}
                                                onError={(e) => (e.currentTarget.src = "/default.png")}
                                                className="w-12 h-12 rounded-full object-cover border"
                                            />
                                            <div>
                                                <div className="text-sm font-medium">
                                                    {u?.username || name || "Unknown"}
                                                </div>
                                                {name ? (
                                                    <div className="text-xs text-gray-500">{name}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FollowersListModal;
