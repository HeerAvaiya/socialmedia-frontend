import { createSlice } from "@reduxjs/toolkit";
import {
  getUserMe,
  updateUser,
  uploadProfileImage,
  deleteProfileImage,
  getDiscoverUsers,
  sendFollowRequest,
  acceptFollowRequest,
  rejectFollowRequest,
  cancelFollowRequest,
  unfollowUser,
  getFollowers,
  getFollowing,
  getFollowRequests,
  removeFollower,
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
    setFollowing(state, action) {
      state.following = action.payload;
    },
    setFollowers(state, action) {
      state.followers = action.payload;
    },
    clearUserState: () => initialState,
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
        state.user = action.payload;
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

          const updatedUser = {
            ...state.user,
            profileImageUrl: action.payload.profileImageUrl,
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
        state.message = "Profile image uploaded successfully";
      })

      .addCase(deleteProfileImage.fulfilled, (state) => {
        if (state.user) {
          state.user.profileImageUrl = null;
        }
        state.message = "Profile image deleted successfully";
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
        const { userId, followStatus } = action.payload;
        state.discoverUsers = state.discoverUsers.map(u =>
          u.id === userId ? { ...u, isFollowing: followStatus !== "none", followStatus } : u
        );
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
          u.id === userId ? { ...u, isFollowing: false, followStatus: "none" } : u
        );
        state.following = state.following.filter((u) => u.id !== userId);
      })

      .addCase(cancelFollowRequest.fulfilled, (state, action) => {
        const userId = action.payload;
        state.discoverUsers = state.discoverUsers.map((u) =>
          u.id === userId ? { ...u, isFollowing: false, followStatus: "none" } : u
        );
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
      })

      .addCase(removeFollower.fulfilled, (state, action) => {
        const followerId = action.payload;
        state.followers = state.followers.filter((f) => f.id !== followerId);
        state.message = "Follower removed";
      });

  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;
