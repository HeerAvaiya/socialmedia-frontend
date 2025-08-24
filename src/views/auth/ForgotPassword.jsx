import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAction } from '../../store/actions/auth.action';
import Alert from '../../components/common/Alert';
import Toast from '../../components/common/Toast';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
    const { message, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim()) return;

        setBtnLoading(true);
        dispatch(forgotPasswordAction(email));

        setTimeout(() => {
            setBtnLoading(false);
            setEmail("");
        }, 3000);
    };

    useEffect(() => {
        if (message) {
            Toast.success(message);
        }
        if (error) {
            Toast.error(error);
        }
    }, [message, error]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Forgot Password
                </h2>

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
                    disabled={btnLoading}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-md flex items-center justify-center"
                >
                    {btnLoading ? (
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                        "Send Reset Link"
                    )}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;