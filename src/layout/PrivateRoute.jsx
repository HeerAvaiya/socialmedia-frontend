import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../layout/Header";

const PrivateRoute = () => {
    const { token, user } = useSelector((state) => state.auth);

    if (!token || !user) return <Navigate to="/login" replace />;
    if (!user.username) return <Navigate to="/login" replace />;

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default PrivateRoute;
