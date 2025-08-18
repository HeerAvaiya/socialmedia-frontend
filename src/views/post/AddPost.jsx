import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/actions/post.action";

const AddPost = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.post);

    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!caption || !image) {
            alert("Caption and Image are required!");
            return;
        }

        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("image", image);

        dispatch(createPost(formData));
        setCaption("");
        setImage(null);
    };

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
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    {loading ? "Posting..." : "Post"}
                </button>
            </form>
        </div>
    );
};

export default AddPost;
