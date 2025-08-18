import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiDotsVertical } from "react-icons/hi";
import { FaHeart, FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import {
    updatePostImage,
    deletePost,
    toggleLike,
    getPostComments,
    createComment,
    updateComment,
    deleteComment,
} from "../../store/actions/post.action";

const PostCard = ({ post }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [menuOpen, setMenuOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [caption, setCaption] = useState(post?.caption || "");
    const fileInputRef = useRef(null);
    const [newImage, setNewImage] = useState(null);

    const [liked, setLiked] = useState(post?.likedByMe || false);
    const [likesCount, setLikesCount] = useState(post?.likesCount || 0);

    const [commentText, setCommentText] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingText, setEditingText] = useState("");


    const postFromRedux = useSelector((state) =>
        state.post.userPosts.find((p) => p.id === post.id)
    );

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
        setEditMode(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
        }
    };

    const handleSave = () => {
        const formData = new FormData();
        if (newImage) formData.append("image", newImage);
        formData.append("caption", caption);

        dispatch(updatePostImage({ postId: post.id, formData }));

        setEditMode(false);
        setNewImage(null);
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
                .catch((err) => {
                    console.error("Failed to update:", err);
                });
        }
    };


    const handleDeleteComment = (commentId) => {
        dispatch(deleteComment(commentId))
            .then(() => dispatch(getPostComments(post.id)));
    };

    const imageSrc =
        newImage
            ? URL.createObjectURL(newImage)
            : post.imageUrl || post.image || post.url || post.photo || "";

    return (
        <div className="relative group border rounded-lg overflow-hidden p-2">
            {imageSrc ? (
                <img
                    src={imageSrc}
                    alt={caption || "Post"}
                    className="w-full h-40 object-cover rounded"
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
                    />
                    <button
                        onClick={handleSave}
                        className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 text-xs"
                    >
                        Save
                    </button>
                </div>
            ) : (
                post.caption && (
                    <p className="text-xs mt-1 px-1">{post.caption}</p>
                )
            )}

            {/*  Like &  Comment buttons */}
            <div className="flex items-center gap-4 mt-2 px-1">

                <button
                    onClick={handleLike}
                    className={`flex items-center gap-1 ${liked ? "text-red-500" : "text-gray-500"}`}
                >
                    {liked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
                    <span className="text-xs">{likesCount}</span>
                </button>

                <button
                    onClick={() => setShowComments(true)}
                    className="flex items-center gap-1 text-gray-600"
                >
                    <FaRegCommentDots size={16} />
                    <span className="text-xs">{post.commentCount || 0}</span>
                </button>
            </div>


            <Dialog
                open={showComments}
                onClose={() => setShowComments(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-2">
                    <Dialog.Panel className="bg-white rounded-lg p-4 w-full max-w-md">
                        <Dialog.Title className="font-semibold text-sm mb-2">
                            Comments
                        </Dialog.Title>

                        {/* Input */}
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Add a comment..."
                                className="w-full border rounded px-2 py-1 text-xs"
                            />
                            <button
                                onClick={handleAddComment}
                                className="bg-blue-500 text-white px-3 rounded text-xs"
                            >
                                Post
                            </button>
                        </div>

                        {/* Comments list */}
                        {comments.length > 0 ? (
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {comments.map((c) => (
                                    <div
                                        key={c.id}
                                        className="flex justify-between items-center text-xs border-b pb-1"
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
                                            
                                            <>
                                                <p>{c.text}</p>
                                                {c.userId === user?.id && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            className="text-blue-500 text-[10px]"
                                                            onClick={() => {
                                                                setEditingCommentId(c.id);
                                                                setEditingText(c.text);
                                                            }}
                                                        >
                                                            Update
                                                        </button>
                                                        <button
                                                            className="text-red-500 text-[10px]"
                                                            onClick={() => handleDeleteComment(c.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 text-xs">No comments yet</p>
                        )}

                        <div className="mt-3 text-right">
                            <button
                                onClick={() => setShowComments(false)}
                                className="bg-gray-300 px-3 py-1 rounded text-xs"
                            >
                                Close
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>



            <div className="absolute top-1 right-1">
                <HiDotsVertical
                    className="cursor-pointer text-white bg-black/50 rounded-full p-1"
                    size={20}
                    onClick={() => setMenuOpen((prev) => !prev)}
                />
                {menuOpen && !editMode && (
                    <div className="absolute right-0 mt-2 w-28 bg-white shadow-md rounded text-sm z-10">
                        <button
                            className="w-full text-left px-3 py-2 hover:bg-gray-100"
                            onClick={handleUpdateClick}
                        >
                            Update
                        </button>
                        <button
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostCard;
