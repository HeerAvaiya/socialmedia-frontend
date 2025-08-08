import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getUserMe,
    getUserPosts,
    getFollowers,
    getFollowing,
    uploadProfileImage,
    deleteProfileImage,
    updateUser,
} from "../../store/actions/user.action";
import { HiDotsVertical } from "react-icons/hi";

const Profile = () => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const { user, posts, followers, following } = useSelector((state) => state.user);
    const { token } = useSelector((state) => state.auth);

    const [localImage, setLocalImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editUsername, setEditUsername] = useState("");
    const [editBio, setEditBio] = useState("");

    useEffect(() => {
        const savedImage = localStorage.getItem("profileImageUrl");
        if (savedImage) setLocalImage(savedImage);
    }, []);

    useEffect(() => {
        if (user?.profileImageUrl) {
            localStorage.setItem("profileImageUrl", user.profileImageUrl);
            setLocalImage(user.profileImageUrl);
        }
    }, [user?.profileImageUrl]);

    useEffect(() => {
        if (token) dispatch(getUserMe());
    }, [token]);

    useEffect(() => {
        if (user?.id) {
            dispatch(getUserPosts(user.id));
            dispatch(getFollowers(user.id));
            dispatch(getFollowing(user.id));
        }
    }, [user?.id]);

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

    const handleEditClick = () => {
        setEditUsername(user?.username || "");
        setEditBio(user?.bio || "");
        setShowEdit(true);
    };

    const handleSaveChanges = async () => {
        await dispatch(updateUser({ username: editUsername, bio: editBio }));
        dispatch(getUserMe());
        setShowEdit(false);
    };

    const imageUrl = user?.profileImageUrl || localImage || "/default.png";

    return (
        <div className="p-4 max-w-xl mx-auto">
            {/* Profile Header */}
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

                {/* Username & Bio */}
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

            {/* Stats */}
            <div className="flex justify-between mt-6 text-center">
                <div>
                    <p className="text-lg font-bold">{posts?.length || 0}</p>
                    <p className="text-sm">Posts</p>
                </div>
                <div>
                    <p className="text-lg font-bold">{followers?.length || 0}</p>
                    <p className="text-sm">Followers</p>
                </div>
                <div>
                    <p className="text-lg font-bold">{following?.length || 0}</p>
                    <p className="text-sm">Following</p>
                </div>
            </div>

            {/* Posts */}
            <div className="grid grid-cols-3 gap-2 mt-6">
                {posts?.length === 0 ? (
                    <p className="col-span-3 text-center text-gray-500">No posts yet.</p>
                ) : (
                    posts.map((post) => (
                        <img
                            key={post.id}
                            src={post.imageUrl}
                            alt={post.caption}
                            className="w-full h-32 object-cover"
                        />
                    ))
                )}
            </div>

            {/* Edit Modal */}
            {showEdit && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-80">
                        <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
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
                        <div className="flex justify-end gap-2">
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
        </div>
    );
};

export default Profile;
