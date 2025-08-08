import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAction } from '../../store/actions/auth.action';
import Loader from '../../components/common/Loader';
import Alert from '../../components/common/Alert';
import Toast from '../../components/common/Toast';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const { loading, message, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        dispatch(forgotPasswordAction(email));
        Toast.success("Reset link sent to your email.");
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>

                {error && <Alert message={error} />}

                <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-md"
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
