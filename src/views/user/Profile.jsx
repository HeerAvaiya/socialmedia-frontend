import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FollowersListModal from "./ FollowersListModal";
import {
    getUserMe,
    getFollowers,
    getFollowing,
    uploadProfileImage,
    deleteProfileImage,
    updateUser,
} from "../../store/actions/user.action";
import { getUserPosts, updatePostImage, deletePost } from "../../store/actions/post.action";
import PostCard from "../../views/post/PostCard";
import { HiDotsVertical } from "react-icons/hi";

const Profile = () => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const { user, followers, following } = useSelector((state) => state.user);
    const { userPosts } = useSelector((state) => state.post);
    const { token } = useSelector((state) => state.auth);

    const [localImage, setLocalImage] = useState(() => {
        return localStorage.getItem("profileImageUrl") || null;
    });
    const [loading, setLoading] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editUsername, setEditUsername] = useState("");
    const [editBio, setEditBio] = useState("");
    const [modalType, setModalType] = useState(null);

    useEffect(() => {
        if (token) {
            dispatch(getUserMe()).then((res) => {
                if (res?.payload) {
                    const { id, profileImageUrl } = res.payload;

                    if (profileImageUrl) {
                        localStorage.setItem("profileImageUrl", profileImageUrl);
                        setLocalImage(profileImageUrl);
                    } else {
                        localStorage.removeItem("profileImageUrl");
                        setLocalImage(null);
                    }

                    dispatch(getUserPosts(id));
                    dispatch(getFollowers(id));
                    dispatch(getFollowing(id));
                }
            });
        }
    }, [token, dispatch]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("image", file);
        setLoading(true);
        const res = await dispatch(uploadProfileImage(formData));
        setLoading(false);
        if (res?.payload?.profileImageUrl) {
            localStorage.setItem("profileImageUrl", res.payload.profileImageUrl);
            setLocalImage(res.payload.profileImageUrl);
        }
    };

    const handleDeleteImage = async () => {
        setLoading(true);
        await dispatch(deleteProfileImage());
        setLoading(false);
        localStorage.removeItem("profileImageUrl");
        setLocalImage(null);
    };

    const handleOpenModal = (type) => {
        if (type === "followers") {
            dispatch(getFollowers(user.id));
        } else {
            dispatch(getFollowing(user.id));
        }
        setModalType(type);
    };

    const handleEditClick = () => {
        setEditUsername(user?.username || "");
        setEditBio(user?.bio || "");
        setShowEdit(true);
    };

    const handleSaveChanges = async () => {
        await dispatch(updateUser({ username: editUsername, bio: editBio }));
        setShowEdit(false);
    };

    const handleTogglePrivacy = async () => {
        if (!user) return;
        const updatedPrivacy = !user.isPrivate;
        await dispatch(updateUser({ isPrivate: updatedPrivacy }));
    };

    useEffect(() => {
        console.log("Updated userPosts 👉", userPosts);
    }, [userPosts]);

    const imageUrl = user?.profileImageUrl || localImage || "/default.png";

    return (
        <div className="p-4 max-w-xl mx-auto">
            {/* --- Profile Header --- */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    <img
                        src={imageUrl}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover cursor-pointer border"
                        onClick={() => fileInputRef.current?.click()}
                        onContextMenu={(e) => {
                            e.preventDefault();
                            handleDeleteImage();
                        }}
                    />
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-full">
                            <div className="w-6 h-6 border-4 border-t-transparent border-gray-500 rounded-full animate-spin" />
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">{user?.username || "username"}</h2>
                        <HiDotsVertical
                            className="cursor-pointer text-gray-600"
                            size={20}
                            onClick={handleEditClick}
                        />
                    </div>
                    {user?.bio && <p className="text-sm text-gray-700">{user.bio}</p>}
                </div>
            </div>

            {/* --- Counts --- */}
            <div className="flex justify-between mt-6 text-center">
                <div>
                    {/* <p className="text-lg font-bold">{posts?.length || 0}</p> */}
                    <p className="text-lg font-bold">{userPosts?.length || 0}</p>
                    <p className="text-sm">Posts</p>
                </div>
                <div
                    className="cursor-pointer"
                    onClick={() => handleOpenModal("followers")}
                >
                    <p className="text-lg font-bold">{followers?.length || 0}</p>
                    <p className="text-sm">Followers</p>
                </div>
                <div
                    className="cursor-pointer"
                    onClick={() => handleOpenModal("following")}
                >
                    <p className="text-lg font-bold">{following?.length || 0}</p>
                    <p className="text-sm">Following</p>
                </div>
            </div>

            {/* Followers / Following Modal */}
            {modalType && (
                <FollowersListModal
                    type={modalType}
                    onClose={() => setModalType(null)}
                />
            )}

            {/* Edit Modal */}
            {showEdit && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-80">
                        <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
                        <div className="mt-2 mb-4 flex items-center gap-6">
                            <label className="text-sm font-medium">
                                <span className="font-semibold">
                                    {user?.isPrivate ? "Private" : "Public"}
                                </span>
                            </label>
                            <button
                                onClick={handleTogglePrivacy}
                                className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
                            >
                                Toggle Privacy
                            </button>
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium">Username</label>
                            <input
                                type="text"
                                value={editUsername}
                                onChange={(e) => setEditUsername(e.target.value)}
                                className="w-full border px-3 py-1 rounded mt-1 text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Bio</label>
                            <textarea
                                value={editBio}
                                onChange={(e) => setEditBio(e.target.value)}
                                className="w-full border px-3 py-1 rounded mt-1 text-sm resize-none"
                                rows={3}
                            />
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setShowEdit(false)}
                                className="px-4 py-1 rounded bg-gray-300 text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveChanges}
                                className="px-4 py-1 rounded bg-blue-600 text-white text-sm"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8">
                {userPosts && userPosts.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                        {userPosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">No posts yet</p>
                )}
            </div>
        </div>
    );
};

export default Profile; 