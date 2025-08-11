import { createSlice } from "@reduxjs/toolkit";
import {
  getUserMe,
  updateUser,
  uploadProfileImage,
  deleteProfileImage,
  getUserPosts,
  getDiscoverUsers,
  sendFollowRequest,
  acceptFollowRequest,
  rejectFollowRequest,
  unfollowUser,
  getFollowers,
  getFollowing,
  getFollowRequests,
} from "../actions/user.action";

const initialState = {
  user: null,
  posts: [],
  followers: [],
  following: [],
  discoverUsers: [],
  followRequests: [],
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
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // direct update user in state
        state.message = "Profile updated successfully";
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        if (state.user) {
          state.user.profileImageUrl = action.payload.profileImageUrl;
        }
        state.message = "Profile image uploaded successfully";
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


      .addCase(getDiscoverUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDiscoverUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.discoverUsers = action.payload;
      })
      .addCase(getDiscoverUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(sendFollowRequest.fulfilled, (state, action) => {
        const userId = action.payload.userId;
        state.discoverUsers = state.discoverUsers.map((u) =>
          u.id === userId ? { ...u, isFollowing: true, followStatus: 'pending' } : u
        );
        state.message = action.payload.status;
      })

      

      .addCase(acceptFollowRequest.fulfilled, (state, action) => {
        state.message = "Follow request accepted";
        state.followRequests = state.followRequests.filter(
          (req) => req.id !== action.payload
        );
      })

      .addCase(rejectFollowRequest.fulfilled, (state, action) => {
        state.message = "Follow request rejected";
        state.followRequests = state.followRequests.filter(
          (req) => req.id !== action.payload
        );
      })

      .addCase(unfollowUser.fulfilled, (state, action) => {
        const userId = action.payload;
        state.discoverUsers = state.discoverUsers.map((u) =>
          u.id === userId ? { ...u, isFollowing: false, followStatus: null } : u
        );
        state.message = "Unfollowed user";
      })

      .addCase(getFollowers.fulfilled, (state, action) => {
        state.followers = action.payload;
      })

      .addCase(getFollowing.fulfilled, (state, action) => {
        state.following = action.payload;
      })


      .addCase(getFollowRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFollowRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.followRequests = action.payload;
      })
      .addCase(getFollowRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;
