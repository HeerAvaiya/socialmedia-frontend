import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
    getUserMe,
    deleteProfileImage,
    getFollowRequests,
} from "../store/actions/user.action";
import { logoutAction } from "../store/actions/auth.action";
import { useNavigate, Link } from "react-router-dom";
import { clearAuthState } from "../store/reducers/auth.reducer";

import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import PersonIcon from "@mui/icons-material/Person";
import Badge from "@mui/material/Badge";

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MenuIcon from "@mui/icons-material/Menu";
import { clearUserState } from "../store/reducers/user.reducer";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [localImage, setLocalImage] = useState(null);

    const { token } = useSelector((state) => state.auth);
    const { user, followRequests } = useSelector((state) => state.user);


    useEffect(() => {
        if (token && !user?.id) {
            dispatch(getUserMe());
        }
    }, [dispatch, token, user?.id]);

    useEffect(() => {
        if (user?.id) {
            dispatch(getFollowRequests());
        }
    }, [dispatch, user?.id]);

    const handleDeleteImage = async (e) => {
        e.preventDefault();
        setLoading(true);
        await dispatch(deleteProfileImage());
        setLoading(false);
        setLocalImage(null);
    };

    const handleLogout = () => {
        dispatch(logoutAction()).then(() => {
            dispatch(clearUserState());
            setLocalImage(null);
            dispatch(clearAuthState())
            navigate("/login");
        });
    };

    const imageUrl = user?.profileImageUrl || localImage;
    const pendingRequestCount = followRequests?.length || 0;

    return (
        <aside className="w-64 h-screen border-r border-gray-300 bg-white fixed left-0 top-0 flex flex-col justify-between">
            <div>
                <div className="p-6 text-3xl font-bold font-cursive">
                    <Link to="/">Instagram</Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-4 px-4">
                    <Link
                        to="/"
                        className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded"
                    >
                        <HomeIcon /> <span>Home</span>
                    </Link>

                    <Link
                        to="/discover"
                        className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded"
                    >
                        <SearchIcon /> <span>Search</span>
                    </Link>

                    <Link
                        to="/follow-requests"
                        className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded"
                    >
                        <Badge badgeContent={pendingRequestCount} color="error">
                            <FavoriteBorderIcon />
                        </Badge>
                        <span>Follow Requests</span>
                    </Link>

                    <button
                        onClick={() => navigate("/add-post")}
                        className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded"
                    >
                        <AddBoxIcon /> <span>Create Post</span>
                    </button>

                    <div
                        onClick={() => navigate("/profile")}
                        className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded cursor-pointer"
                    >
                        <IconButton
                            onClick={(e) => e.stopPropagation()}
                            onContextMenu={handleDeleteImage}
                            sx={{
                                padding: "0 !important",
                                bgcolor: "#ec4899",
                                color: "#fff",
                                "&:hover": { bgcolor: "#db2777" },
                                width: "31px",
                                height: "31px",
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={20} sx={{ color: "#fff" }} />
                            ) : imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="profile"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <PersonIcon />
                            )}
                        </IconButton>
                        <span className="ml-2">Profile</span>
                    </div>

                </nav>
            </div>

            <div className="px-4 py-6 flex flex-col space-y-4">
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded text-red-500"
                >
                    <MenuIcon /> <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
