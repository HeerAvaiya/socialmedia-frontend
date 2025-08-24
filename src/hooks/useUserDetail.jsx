import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useUserDetail = () => {

    const navigate = useNavigate();

    const user = useSelector((state) => state.user.user);
    
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (user) {
            const hasUsername = !!user.username;
            if (!hasUsername) {
                navigate("/login");
            } else {
                navigate("/home");
            }
        }
    }, [user, navigate]);

    return {
        user,
        token,
    };
};

export default useUserDetail;
