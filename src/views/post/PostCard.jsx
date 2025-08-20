import { useState, useRef, useEffect } from "react"; import { useDispatch, useSelector } from "react-redux";
import { HiDotsVertical } from "react-icons/hi";
import { FaHeart, FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import {
    updatePostImage,
    deletePost,
    toggleLike,
    getPostLikes,
    getPostComments,
    createComment,
    updateComment,
    deleteComment,
} from "../../store/actions/post.action";

const PostCard = ({ post, isFeed = false, imgClass = "" }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [caption, setCaption] = useState(post?.caption || "");
    const fileInputRef = useRef(null);
    const [newImage, setNewImage] = useState(null);

    const [liked, setLiked] = useState(post?.likedByMe || false);
    const [likesCount, setLikesCount] = useState(post?.likesCount || 0);

    const [showLikesModal, setShowLikesModal] = useState(false);
    const [likedUsers, setLikedUsers] = useState([]);

    const [commentText, setCommentText] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingText, setEditingText] = useState("");


    const postFromRedux = useSelector((state) => {
        const { feedPosts = [], userPosts = [], posts = [] } = state.post || {};
        const collection = isFeed ? feedPosts : (userPosts?.length ? userPosts : posts);
        return collection?.find((p) => p.id === post.id) || post;
    });

    const comments = postFromRedux?.comments || [];

    if (!post) return null;

    useEffect(() => {
        setLiked(post?.likedByMe || false);
        setLikesCount(post?.likesCount || 0);
    }, [post?.likedByMe, post?.likesCount]);

    useEffect(() => {
        if (showComments) {
            dispatch(getPostComments(post.id));
        }
    }, [showComments, dispatch, post.id]);

    const handleUpdateClick = () => {
        setMenuOpen(false);
        // setEditMode(true);
        setShowEditModal(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setNewImage(file);
    };


    const handleSave = async () => {
        setLoading(true);
        const formData = new FormData();
        if (newImage) formData.append("image", newImage);
        formData.append("caption", caption);
        try {
            await dispatch(
                updatePostImage({ postId: post.id, formData })
            ).unwrap();
            setNewImage(null);
            setShowEditModal(false);
        } catch (error) {
            console.error("Update failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        setMenuOpen(false);
        if (window.confirm("Are you sure you want to delete this post?")) {
            dispatch(deletePost(post.id));
        }
    };

    const handleLike = async () => {
        try {
            const res = await dispatch(toggleLike(post.id));
            if (res.payload) {
                setLiked(res.payload.likedByMe);
                setLikesCount(res.payload.likesCount);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleShowLikes = async () => {
        try {
            const res = await dispatch(getPostLikes(post.id)).unwrap();
            setLikedUsers(res.users || []);
            setShowLikesModal(true);
        } catch (err) {
            console.error("Failed to fetch likes:", err);
        }
    };

    const handleAddComment = () => {
        if (commentText.trim()) {
            dispatch(createComment({ postId: post.id, text: commentText }))
                .then(() => dispatch(getPostComments(post.id)));
            setCommentText("");
        }
    };

    const handleUpdateComment = (commentId) => {
        if (editingText.trim()) {
            dispatch(updateComment({ commentId, text: editingText }))
                .unwrap()
                .then(() => {
                    setEditingCommentId(null);
                    setEditingText("");
                })
                .catch((err) => console.error("Failed to update:", err));
        }
    };

    const handleDeleteComment = (commentId) => {
        dispatch(deleteComment(commentId))
            .then(() => dispatch(getPostComments(post.id)));
    };

    const imageSrc = post.imageUrl || post.image || post.url || post.photo || "";

    return (
        <div className="relative group border border-[#bfbbbb] border-t-0 rounded-t-none rounded-lg overflow-hidden p-2 bg-white">
            {imageSrc ? (
                <img
                    src={imageSrc}
                    alt={caption || "Post"}
                    className={`${imgClass} w-full bg-center rounded`}
                />
            ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                    No Image
                </div>
            )}

            {editMode ? (
                <div className="mt-2">
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full p-1 border rounded text-xs"
                        placeholder="Edit caption..."
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="mt-2 w-full text-xs"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                    />
                    <button
                        onClick={handleSave}
                        className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 text-xs"
                    >
                        Save
                    </button>
                </div>
            ) : (
                post.caption && <p className="text-sm mt-1 px-1">{post.caption}</p>
            )}

            {/* Like & Comment */}
            <div className="flex items-center gap-4 mt-2 px-1">
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-1 cursor-pointer ${liked ? "text-red-500" : "text-gray-500"}`}
                    >
                        {liked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
                        <span className="text-[13px]">{likesCount}</span>
                    </button>

                    {likesCount > 0 && (
                        <button
                            className="text-[13px] cursor-pointer"
                            onClick={handleShowLikes}
                        >
                            Liked by
                        </button>
                    )}
                </div>

                <button
                    onClick={() => setShowComments(true)}
                    className="flex items-center gap-1 text-gray-600 cursor-pointer"
                >
                    <FaRegCommentDots size={16} />

                    <span className="text-xs">
                        {postFromRedux?.commentCount ?? post.commentCount ?? 0}
                    </span>

                </button>
            </div>


            {/* Likes section */}
            <Dialog
                open={showLikesModal}
                onClose={() => setShowLikesModal(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-2">
                    <Dialog.Panel className="bg-white rounded-lg w-full max-w-sm relative">

                        <div className="flex items-center justify-between p-5 py-3 border-b">
                            <Dialog.Title className="font-semibold text-lg">
                                Liked by
                            </Dialog.Title>
                            <button
                                onClick={() => setShowLikesModal(false)}
                                aria-label="Close"
                                className="p-1 rounded-full hover:bg-gray-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-5">
                            {likedUsers.length > 0 ? (
                                <div className="space-y-2 max-h-60 overflow-y-auto ">
                                    {likedUsers.map((user) => (
                                        <div key={user.id} className="flex items-center gap-3">
                                            <img
                                                src={user.profileImageUrl || "/default.png"}
                                                alt={user.username}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                            <span className="text-sm font-medium">{user.username}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-xs">No likes yet</p>
                            )}

                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

            {/* Comments section */}
            <Dialog
                open={showComments}
                onClose={() => setShowComments(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-2">
                    <Dialog.Panel className="bg-white rounded-lg w-full max-w-md relative">
                        <div className="flex items-center justify-between p-5 py-3 border-b">
                            <Dialog.Title className="font-semibold text-lg">
                                Comments
                            </Dialog.Title>
                            <button
                                onClick={() => setShowComments(false)}
                                aria-label="Close"
                                className="p-1 rounded-full hover:bg-gray-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-5">
                            {/* Add comment input */}
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="w-full border rounded px-2 py-2 text-xs"
                                />
                                <button
                                    onClick={handleAddComment}
                                    className="bg-blue-500 text-white px-5 rounded text-xs cursor-pointer"
                                >
                                    Post
                                </button>
                            </div>

                            {/* Comments list */}
                            {comments.length > 0 ? (
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    {comments.map((c, index) => (
                                        <div
                                            key={index}
                                            className={`flex justify-between items-start text-xs border-b border-black pb-1 ${index === comments.length - 1 ? "border-transparent" : ""}`}
                                        >
                                            {editingCommentId === c.id ? (
                                                <div className="flex w-full gap-2">
                                                    <input
                                                        type="text"
                                                        value={editingText}
                                                        onChange={(e) => setEditingText(e.target.value)}
                                                        className="flex-1 border rounded px-2 py-1 text-xs"
                                                    />
                                                    <button
                                                        className="bg-green-500 text-white px-2 rounded text-xs"
                                                        onClick={() => handleUpdateComment(c.id)}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="bg-gray-300 px-2 rounded text-xs"
                                                        onClick={() => {
                                                            setEditingCommentId(null);
                                                            setEditingText("");
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 w-full">
                                                    <img
                                                        src={c.User?.profileImageUrl || "/default.png"}
                                                        alt={c.User?.username}
                                                        className="w-8 h-8 rounded-full object-cover mt-1"
                                                    />
                                                    <p className="text-sm font-semibold">{c.User?.username}</p>
                                                    <div className="flex-1">
                                                        <p className="text-xs">{c.text}</p>
                                                    </div>
                                                    {c.userId === user?.id && (
                                                        <div className="flex gap-3 ml-2 mt-1">
                                                            <button
                                                                className="text-blue-500 text-[13px] cursor-pointer"
                                                                onClick={() => {
                                                                    setEditingCommentId(c.id);
                                                                    setEditingText(c.text);
                                                                }}
                                                            >
                                                                Update
                                                            </button>
                                                            <button
                                                                className="text-red-500 text-[13px] cursor-pointer"
                                                                onClick={() => handleDeleteComment(c.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-xs">No comments yet</p>
                            )}

                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>


            {!isFeed && (
                <div className="absolute top-1 right-1">
                    <HiDotsVertical
                        className="cursor-pointer text-white bg-black/50 rounded-full p-1"
                        size={20}
                        onClick={() => setMenuOpen((prev) => !prev)}
                    />
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-28 bg-white shadow-md rounded text-sm z-10">
                            <button
                                className="w-full text-left px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={handleUpdateClick}
                            >
                                Update
                            </button>
                            <button
                                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600 cursor-pointer"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            )}


            <Dialog
                open={showEditModal}
                onClose={() => setShowEditModal(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-2">
                    <Dialog.Panel className="bg-white rounded-lg p-5 w-full max-w-sm relative">

                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
                            onClick={() => setShowEditModal(false)}
                        >
                            ×
                        </button>

                        <Dialog.Title className="font-semibold text-lg mb-4">
                            Edit Post
                        </Dialog.Title>


                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="w-full p-2 border rounded text-sm mb-2"
                            placeholder="Edit caption..."
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            className="w-full text-sm mb-3"
                        />

                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className={`w-full py-2 rounded text-sm text-white 
                            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                        >
                            {loading ? (
                                <div className="flex justify-center items-center">
                                    <div className="border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin mr-2"></div>
                                    Saving...
                                </div>
                            ) : (
                                "Save"
                            )}
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>

        </div>
    );
};

export default PostCard;
