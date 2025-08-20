import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../layout/Sidebar";

const PrivateRoute = () => {
    const { token, user } = useSelector((state) => state.auth);
    console.log('PrivateRoute token:', token, 'user:', user);

    if (!token || !user) return <Navigate to="/login" replace />;

    return (
        <>
            <Sidebar />
            <Outlet />
        </>
    );
};

export default PrivateRoute;