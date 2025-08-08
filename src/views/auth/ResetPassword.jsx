import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../libs/axios';
import Toast from '../../components/common/Toast';
import Loader from '../../components/common/Loader';
import Alert from '../../components/common/Alert';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if (newPassword.length < 6) {
            return setError('Password must be at least 6 characters long.');
        }

        if (newPassword !== confirmPassword) {
            return setError("Passwords don't match.");
        }

        setLoading(true);

        try {
            const res = await axiosClient.post(`/users/reset-password/${token}`, { newPassword });
            setMessage(res.data.message);
            Toast.success("Password reset successfully.");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Reset failed.");
            Toast.error(err.response?.data?.message || "Reset failed.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Reset Your Password</h2>

                {error && <Alert message={error} />}
                {/* {message && <Alert message={message} />} */}

                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 mb-4 border rounded-md"
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 mb-4 border rounded-md"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-md"
                >
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;   