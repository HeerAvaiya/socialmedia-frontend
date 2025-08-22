// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useRef, useState } from "react";
// import {
//   getUserMe,
//   uploadProfileImage,
//   deleteProfileImage,
//   getFollowRequests,
// } from "../store/actions/user.action";

// import IconButton from "@mui/material/IconButton";
// import CircularProgress from "@mui/material/CircularProgress";
// import PersonIcon from "@mui/icons-material/Person";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { useNavigate, Link } from "react-router-dom";
// import { clearAuthState } from "../store/reducers/auth.reducer";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import AddBoxIcon from "@mui/icons-material/AddBox"; // + icon import
// import Badge from "@mui/material/Badge";

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
//   const [loading, setLoading] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [localImage, setLocalImage] = useState(null);

//   const { token } = useSelector((state) => state.auth);
//   const { user, followRequests } = useSelector((state) => state.user);

//   useEffect(() => {
//     const savedImage = localStorage.getItem("profileImageUrl");
//     if (savedImage) setLocalImage(savedImage);
//   }, []);

//   useEffect(() => {
//     if (user?.profileImageUrl) {
//       const current = localStorage.getItem("profileImageUrl");
//       if (current !== user.profileImageUrl) {
//         localStorage.setItem("profileImageUrl", user.profileImageUrl);
//         setLocalImage(user.profileImageUrl);
//       }
//     }
//   }, [user?.profileImageUrl]);

//   useEffect(() => {
//     if (token && !user?.id) {
//       dispatch(getUserMe());
//     }
//   }, [dispatch, token, user?.id]);

//   useEffect(() => {
//     if (user?.id) {
//       dispatch(getFollowRequests());
//     }
//   }, [dispatch, user?.id]);

//   const handleImageClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => setAnchorEl(null);

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("image", file);
//       setLoading(true);
//       const res = await dispatch(uploadProfileImage(formData));
//       setLoading(false);

//       if (res?.payload?.profileImageUrl) {
//         localStorage.setItem("profileImageUrl", res.payload.profileImageUrl);
//         setLocalImage(res.payload.profileImageUrl);
//       }
//     }
//   };

//   const handleDeleteImage = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     await dispatch(deleteProfileImage());
//     setLoading(false);
//     localStorage.removeItem("profileImageUrl");
//     setLocalImage(null);
//   };

//   const handleProfile = () => {
//     navigate("/profile");
//     handleClose();
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("profileImageUrl");
//     localStorage.removeItem("following");
//     setLocalImage(null);
//     dispatch(clearAuthState());
//     handleClose();
//   };

//   const imageUrl = user?.profileImageUrl || localImage;
//   const pendingRequestCount = followRequests?.length || 0;

//   return (
//     <header className="bg-white border-b border-gray-300 sticky top-0 z-50">
//       <div className="mx-auto flex items-center justify-between px-4 py-2">
//         <Link
//           to="/"
//           className="text-3xl font-bold font-cursive select-none"
//         >
//           Instagram
//         </Link>
        
//         <div>
//           <input
//             type="file"
//             ref={fileInputRef}
//             className="hidden"
//             onChange={handleImageChange}
//             accept="image/*"
//           />

//           <IconButton
//             onClick={handleImageClick}
//             onContextMenu={handleDeleteImage}
//             sx={{
//               padding: "0 !important",
//               bgcolor: "#ec4899",
//               color: "#fff",
//               "&:hover": { bgcolor: "#db2777" },
//               width: "40px",
//               height: "40px",
//             }}
//           >
//             {loading ? (
//               <CircularProgress size={20} sx={{ color: "#fff" }} />
//             ) : imageUrl ? (
//               <img
//                 src={imageUrl}
//                 alt="profile"
//                 className="w-full h-full rounded-full object-cover"
//               />
//             ) : (
//               <PersonIcon />
//             )}
//           </IconButton>

//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//             anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//             transformOrigin={{ vertical: "top", horizontal: "right" }}
//           >
//             <MenuItem onClick={handleProfile}>Profile</MenuItem>
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//           </Menu>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
