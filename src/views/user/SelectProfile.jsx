import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadProfileImage } from "../../store/actions/user.action";
import { useNavigate } from "react-router-dom";

const SelectProfilePage = () => {
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.user);

    const handleUpload = async () => {
        if (!image) return alert("Please select an image");

        const formData = new FormData();
        formData.append("image", image);

        const resultAction = await dispatch(uploadProfileImage(formData));

        if (uploadProfileImage.fulfilled.match(resultAction)) {
            navigate("/home");
        } else {
            alert(resultAction.payload || "Upload failed");
        }
    };

    const handleSkip = () => {
        navigate("/home");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl mb-6 font-semibold">Select Profile Picture</h1>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="mb-4"
            />
            <div className="flex gap-4">
                <button
                    onClick={handleUpload}
                    className="bg-blue-600 px-6 py-2 text-white rounded disabled:opacity-60"
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
                <button
                    onClick={handleSkip}
                    className="bg-gray-500 px-6 py-2 text-white rounded"
                >
                    Skip
                </button>
            </div>
        </div>
    );
};

export default SelectProfilePage;
