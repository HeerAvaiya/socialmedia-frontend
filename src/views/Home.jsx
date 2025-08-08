import React from "react";
import { useDispatch } from "react-redux";
import { clearAuthState } from "../store/reducers/auth.reducer";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        dispatch(clearAuthState());

        navigate("/login");
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome to Home Page</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
};

export default Home;
