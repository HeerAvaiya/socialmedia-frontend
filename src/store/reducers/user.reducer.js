import { createSlice } from "@reduxjs/toolkit";
import {
  getUserMe,
  updateUser,
  uploadProfileImage,
  updateProfileImage,
  deleteProfileImage,
  getUserPosts,
  getFollowers,
  getFollowing,
} from "../actions/user.action";

const initialState = {
  user: null,
  posts: [],
  followers: [],
  following: [],
  loading: false,
  error: null,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          profileImageUrl: action.payload.profileImageUrl,
        };
        state.message = "Profile image uploaded successfully";
      })

      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.user = action.payload;
        state.message = "Profile image updated successfully";
      })

      .addCase(deleteProfileImage.fulfilled, (state) => {
        if (state.user) {
          state.user.profileImageUrl = null;
        }
        state.message = "Profile image deleted successfully";
      })

      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })

      .addCase(getFollowers.fulfilled, (state, action) => {
        state.followers = action.payload;
      })

      .addCase(getFollowing.fulfilled, (state, action) => {
        state.following = action.payload;
      });
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;

