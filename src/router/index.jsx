import { createBrowserRouter, Navigate } from "react-router-dom";

import PublicRoute from "../layout/PublicRoute";
import PrivateRoute from "../layout/PrivateRoute";

import Login from "../pages/auth/LoginPage";
import Register from "../pages/auth/RegisterPage";
import ForgotPassword from "../pages/auth/ForgotPasswordPage";
import ResetPassword from "../pages/auth/ResetPasswordPage";

import Home from "../pages/HomePage";
import Profile from "../views/user/Profile";


const router = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },

            {
                path: "/forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "/reset-password/:token",
                element: <ResetPassword />,
            },
        ],
    },
    {
        element: <PrivateRoute />,
        children: [
            {
                path: "/",
                element: <Navigate to="/home" replace />
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/profile",
                element: <Profile />
            },
        ],
    },
]);

export default router;



