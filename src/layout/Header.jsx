import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getUserMe,
  uploadProfileImage,
  deleteProfileImage,
} from "../store/actions/user.action";

import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import PersonIcon from "@mui/icons-material/Person";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

import { clearAuthState } from "../store/reducers/auth.reducer"; // ✅ Import clearAuthState

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [localImage, setLocalImage] = useState(null);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImageUrl");
    if (savedImage) {
      setLocalImage(savedImage);
    }
  }, []);

  useEffect(() => {
    if (user?.profileImageUrl) {
      localStorage.setItem("profileImageUrl", user.profileImageUrl);
      setLocalImage(user.profileImageUrl);
    }
  }, [user?.profileImageUrl]);

  useEffect(() => {
    if (token) dispatch(getUserMe());
  }, [dispatch, token]);

  const handleImageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      setLoading(true);
      const res = await dispatch(uploadProfileImage(formData));
      setLoading(false);

      if (res?.payload?.profileImageUrl) {
        localStorage.setItem("profileImageUrl", res.payload.profileImageUrl);
        setLocalImage(res.payload.profileImageUrl);
      }
    }
  };

  const handleDeleteImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(deleteProfileImage());
    setLoading(false);
    localStorage.removeItem("profileImageUrl");
    setLocalImage(null);
  };

  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profileImageUrl");

    dispatch(clearAuthState());

    handleClose();
    navigate("/login");
  };

  const imageUrl = user?.profileImageUrl || localImage;

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
        accept="image/*"
      />

      <IconButton
        onClick={handleImageClick}
        onContextMenu={handleDeleteImage}
        sx={{
          padding: '0 !important',
          bgcolor: "#00BFA5",
          color: "#000",
          "&:hover": { bgcolor: "#00A18D" },
          width: "40px",
          height: "40px",
        }}
      >
        {loading ? (
          <CircularProgress size={20} sx={{ color: "#000" }} />
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt="profile"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <PersonIcon />
        )}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </header>
  );
};

export default Header;
