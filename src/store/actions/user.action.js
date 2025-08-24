import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../libs/axios";

export const getUserMe = createAsyncThunk(
  "user/getUserMe",
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get("/users/me");
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch user");
    }
  });


export const updateUser = createAsyncThunk(
  "user/update",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosClient.put("/users/me", userData);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update user");
    }
  });


export const uploadProfileImage = createAsyncThunk(
  "user/uploadProfileImage",
  async (formData, thunkAPI) => {
    try {
      const res = await axiosClient.post("/users/profile/image", formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Image upload failed");
    }
  });


export const deleteProfileImage = createAsyncThunk(
  "user/deleteProfileImage",
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.delete("/profile/image");
      localStorage.removeItem("profileImageUrl");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Image delete failed");
    }
  });


export const getDiscoverUsers = createAsyncThunk(
  "user/getDiscoverUsers",
  async (search = "", thunkAPI) => {
    try {
      const res = await axiosClient.get("/users/discover", {
        params: { search },
      });
      return res.data.users || res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch discover users"
      );
    }
  }
);


export const sendFollowRequest = createAsyncThunk(
  "user/sendFollowRequest",
  async (userId, thunkAPI) => {
    try {
      const res = await axiosClient.post(`/users/${userId}/follow`);
      return { userId, followStatus: res.data.followStatus };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Follow failed"
      );
    }
  }
);


export const unfollowUser = createAsyncThunk(
  "user/unfollowUser",
  async (userId, thunkAPI) => {
    try {
      await axiosClient.delete(`/users/${userId}/unfollow`);
      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Unfollow failed"
      );
    }
  }
);


export const getFollowers = createAsyncThunk(
  "user/getFollowers",
  async (userId, thunkAPI) => {
    try {
      const res = await axiosClient.get(`/users/${userId}/followers`);
      const followersArray = Array.isArray(res.data.followers)
        ? res.data.followers
        : Object.values(res.data.followers);

      return followersArray;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch followers"
      );
    }
  }
);


export const getFollowing = createAsyncThunk(
  "user/getFollowing",
  async (userId, thunkAPI) => {
    try {
      const res = await axiosClient.get(`/users/${userId}/following`);
      return res.data.following;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch following");
    }
  });


export const getFollowRequests = createAsyncThunk(
  "user/getFollowRequests",
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get("/users/follow-requests");
      return res.data.requests;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch follow requests"
      );
    }
  }
);


export const acceptFollowRequest = createAsyncThunk(
  "user/acceptFollowRequest",
  async (followerId, thunkAPI) => {
    try {
      await axiosClient.put(`/users/${followerId}/accept`);
      return followerId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Accept failed");
    }
  }
);


export const rejectFollowRequest = createAsyncThunk(
  "user/rejectFollowRequest",
  async (followerId, thunkAPI) => {
    try {
      await axiosClient.put(`/users/${followerId}/reject`);
      return followerId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Reject failed");
    }
  }
);


export const cancelFollowRequest = createAsyncThunk(
  "user/cancelFollowRequest",
  async (userId, thunkAPI) => {
    try {
      await axiosClient.delete(`/users/${userId}/cancel`);
      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Cancel failed");
    }
  }
);


export const removeFollower = createAsyncThunk(
  "user/removeFollower",
  async ({ userId, followerId }, thunkAPI) => {
    try {
      await axiosClient.delete(`/users/followers/${followerId}`);
      return followerId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to remove follower"
      );
    }
  }
);