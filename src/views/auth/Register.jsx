import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../store/actions/auth.action";
import { clearAuthState } from "../../store/reducers/auth.reducer";
import { clearErrorAndMessage } from "../../store/reducers/auth.reducer";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({});
    const [localError, setLocalError] = useState(null);
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        dispatch(clearAuthState());
    }, [dispatch]);

    useEffect(() => {
        dispatch(clearErrorAndMessage());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setButtonLoading(true);
            setTimeout(() => {
                setButtonLoading(false);
                dispatch(clearAuthState());
                navigate("/login");
            }, 2000);
        }
    }, [user, navigate, dispatch]);

    useEffect(() => {
        if (error) {
            setLocalError(error);
        }
    }, [error]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.username.trim()) errors.username = "Username is required";
        if (!formData.email.trim()) errors.email = "Email is required";
        if (!formData.password.trim()) errors.password = "Password is required";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        dispatch(registerAction(formData));
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl p-8 animate-fade-in border border-black/50">
                <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
                    Instagram
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Sign up to see photos and videos from your friends.
                </p>

                {/* Error alert with close button */}
                {localError && (
                    <div className="flex items-center justify-between bg-red-100 text-red-600 px-4 py-2 rounded-md mb-4">
                        <span>{localError}</span>
                        <button
                            onClick={() => {
                                setLocalError(null);
                                dispatch(clearErrorAndMessage());
                            }}
                            className="ml-2 text-red-600 font-bold"
                        >
                            ✕
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/30"
                        />
                        {formErrors.username && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/30"
                        />
                        {formErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/30"
                        />
                        {formErrors.password && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || buttonLoading}
                        className="w-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-60"
                    >
                        {loading || buttonLoading ? (
                            <div className="flex items-center space-x-2">
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                <span>
                                    {buttonLoading ? "Redirecting..." : "Registering..."}
                                </span>
                            </div>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Have an account?{" "}
                    <span
                        className="text-purple-600 font-medium cursor-pointer hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Log in
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
