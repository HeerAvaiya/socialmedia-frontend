// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerAction } from '../../store/actions/auth.action';
// import { clearAuthState } from '../../store/reducers/auth.reducer';
// import { useNavigate } from 'react-router-dom';
// import Loader from '../../components/common/Loader';
// import Alert from '../../components/common/Alert';
// import Toast from '../../components/common/Toast';

// const Register = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const { isLoading: loading, error, successMessage: message, user } = useSelector((state) => state.auth);

//     const [formData, setFormData] = useState({ username: '', email: '', password: '' });

//     useEffect(() => {
//         dispatch(clearAuthState());
//     }, []);

//     useEffect(() => {
//         if (user) {
//             setTimeout(() => {
//                 dispatch(clearAuthState());
//                 navigate('/login');
//             }, 1000);
//         }
//     }, [user, navigate]);

//     const handleChange = (e) => {
//         setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(registerAction(formData));
//     };

//     if (loading) return <Loader />;

//     return (
//         <div className="min-h-screen flex items-center justify-center">
//             <div className="w-full max-w-md bg-white rounded-2xl p-8 animate-fade-in border border-black/50">
//                 <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
//                     Instagram
//                 </h1>
//                 <p className="text-center text-gray-600 mb-6">
//                     Sign up to see photos and videos from your friends.
//                 </p>

//                 {error && <Alert message={error} />}

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <input
//                         type="text"
//                         name="username"
//                         placeholder="Username"
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/30"
//                     />
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email address"
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/30"
//                     />
//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/30"
//                     />

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
//                     >
//                         {loading ? 'Registering...' : 'Sign Up'}
//                     </button>
//                 </form>

//                 <p className="text-center text-sm text-gray-600 mt-4">
//                     Have an account?{' '}
//                     <span
//                         className="text-purple-600 font-medium cursor-pointer hover:underline"
//                         onClick={() => navigate('/login')}
//                     >
//                         Log in
//                     </span>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Register;






















import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../store/actions/auth.action";
import { clearAuthState } from "../../store/reducers/auth.reducer";
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
        if (user) {
            setButtonLoading(true);
            setTimeout(() => {
                setButtonLoading(false);
                dispatch(clearAuthState());
                navigate("/login");
            }, 3000);
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
                            onClick={() => setLocalError(null)}
                            className="ml-2 text-red-600 font-bold"
                        >
                            ✕
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username */}
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

                    {/* Email */}
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

                    {/* Password */}
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

                    {/* Submit Button */}
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
