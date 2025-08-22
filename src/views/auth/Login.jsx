////working only loader not working
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuthentication } from '../../hooks/useAuthentication';
// import Loader from '../../components/common/Loader';

// const Login = () => {
//     const navigate = useNavigate();
//     const { login, clearAuth, token, loading, error, user } = useAuthentication();

//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [formErrors, setFormErrors] = useState({});
//     const [localError, setLocalError] = useState(null);
//     const [successLoading, setSuccessLoading] = useState(false);

//     useEffect(() => {
//         clearAuth();
//     }, []);

//     useEffect(() => {
//         if (error) {
//             setLocalError(error);
//         }
//     }, [error]);

//     useEffect(() => {
//         if (token && user) {
//             setSuccessLoading(true);
//             const timer = setTimeout(() => {
//                 setSuccessLoading(false);
//                 navigate("/home");
//             }, 3000);
//             return () => clearTimeout(timer);
//         }
//     }, [token, user, navigate]);


//     const handleChange = (e) => {
//         setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//         setFormErrors(prev => ({ ...prev, [e.target.name]: '' }));
//     };

//     const validateForm = () => {
//         const errors = {};
//         if (!formData.email.trim()) errors.email = "Email is required";
//         if (!formData.password.trim()) errors.password = "Password is required";
//         setFormErrors(errors);
//         return Object.keys(errors).length === 0;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;
//         login(formData);
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center">
//             <div className="w-full max-w-md bg-white rounded-2xl border border-black/50 p-8 animate-fade-in">
//                 <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
//                     Instagram
//                 </h1>
//                 <p className="text-center text-gray-600 mb-6">
//                     Welcome back! Log in to continue.
//                 </p>

//                 {localError && (
//                     <div className="flex items-center justify-between bg-red-100 text-red-600 px-4 py-2 rounded-md mb-4">
//                         <span>{localError}</span>
//                         <button
//                             onClick={() => setLocalError(null)}
//                             className="ml-2 text-red-600 font-bold"
//                         >
//                             ✕
//                         </button>
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email address"
//                             onChange={handleChange}
//                             value={formData.email}
//                             className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/30"
//                         />
//                         {formErrors.email && (
//                             <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
//                         )}
//                     </div>

//                     <div>
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             onChange={handleChange}
//                             value={formData.password}
//                             className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/30"
//                         />
//                         {formErrors.password && (
//                             <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
//                         )}
//                     </div>

//                     <div className="text-right text-sm mt-1">
//                         <span
//                             onClick={() => {
//                                 if (!formData.email.trim()) {
//                                     alert("Please enter your email before proceeding.");
//                                 } else {
//                                     navigate(`/forgot-password?email=${encodeURIComponent(formData.email)}`);
//                                 }
//                             }}
//                             className="text-purple-600 hover:underline cursor-pointer"
//                         >
//                             Forgot Password?
//                         </span>
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={loading || successLoading}
//                         className="w-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-60"
//                     >
//                         {loading ? (
//                             <div className="flex items-center space-x-2">
//                                 <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                                 <span>Logging in...</span>
//                             </div>
//                         ) : successLoading ? (
//                             <div className="flex items-center space-x-2">
//                                 <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                                 <span>Redirecting...</span>
//                             </div>
//                         ) : (
//                             "Log In"
//                         )}
//                     </button>


//                 </form>

//                 <p className="text-center text-sm text-gray-600 mt-4">
//                     Don't have an account?{' '}
//                     <span
//                         className="text-purple-600 font-medium cursor-pointer hover:underline"
//                         onClick={() => navigate('/register')}
//                     >
//                         Sign up
//                     </span>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;




















import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../hooks/useAuthentication';

const Login = () => {
    const navigate = useNavigate();
    const { login, clearAuth, token, loading, error, user } = useAuthentication();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({});
    const [localError, setLocalError] = useState(null);
    const [successLoading, setSuccessLoading] = useState(false);

    useEffect(() => {
        clearAuth();
    }, []);

    useEffect(() => {
        if (error) {
            setLocalError(error);
        }
    }, [error]);

    useEffect(() => {
        if (token && user) {
            setSuccessLoading(true);
            const timer = setTimeout(() => {
                setSuccessLoading(false);
                navigate("/home");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [token, user, navigate]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setFormErrors(prev => ({ ...prev, [e.target.name]: '' }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.email.trim()) errors.email = "Email is required";
        if (!formData.password.trim()) errors.password = "Password is required";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        login(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl border border-black/50 p-8 animate-fade-in">
                <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
                    Instagram
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Welcome back! Log in to continue.
                </p>

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
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            onChange={handleChange}
                            value={formData.email}
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
                            onChange={handleChange}
                            value={formData.password}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/30"
                        />
                        {formErrors.password && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                        )}
                    </div>

                    <div className="text-right text-sm mt-1">
                        <span
                            onClick={() => {
                                if (!formData.email.trim()) {
                                    alert("Please enter your email before proceeding.");
                                } else {
                                    navigate(`/forgot-password?email=${encodeURIComponent(formData.email)}`);
                                }
                            }}
                            className="text-purple-600 hover:underline cursor-pointer"
                        >
                            Forgot Password?
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || successLoading}
                        className="w-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-60"
                    >
                        {loading ? (
                            <div className="flex items-center space-x-2">
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                <span>Logging in...</span>
                            </div>
                        ) : successLoading ? (
                            <div className="flex items-center space-x-2">
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                <span>Redirecting...</span>
                            </div>
                        ) : (
                            "Log In"
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <span
                        className="text-purple-600 font-medium cursor-pointer hover:underline"
                        onClick={() => navigate('/register')}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;