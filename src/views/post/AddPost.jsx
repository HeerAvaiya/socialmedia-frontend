import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/actions/post.action";
import Toast from "../../components/common/Toast";
import { useNavigate } from "react-router-dom";
import { clearPostState } from "../../store/reducers/post.reducer";

const AddPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, message, error } = useSelector((state) => state.post);

    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [buttonLoading, setButtonLoading] = useState(false);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!caption || !image) {
            Toast.error("Caption and Image are required!");
            return;
        }

        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("image", image);

        dispatch(createPost(formData));
    };

    // Success handling
    useEffect(() => {
        if (message) {
            Toast.success(message);

            setButtonLoading(true);
            setTimeout(() => {
                setButtonLoading(false);
                dispatch(clearPostState()); 
                navigate("/home");
            }, 2000);
        }
    }, [message, dispatch, navigate]);

    // Error handling
    useEffect(() => {
        if (error) {
            Toast.error(error);
        }
    }, [error]);

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Create Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Write a caption..."
                    className="w-full p-2 border rounded"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full"
                />
                <button
                    type="submit"
                    disabled={loading || buttonLoading}
                    className="w-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-60"
                >
                    {loading || buttonLoading ? (
                        <div className="flex items-center space-x-2">
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>
                                {buttonLoading ? "Redirecting..." : "Posting..."}
                            </span>
                        </div>
                    ) : (
                        "Post"
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddPost;
    