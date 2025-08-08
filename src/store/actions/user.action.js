import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../libs/axios";

export const getUserMe = createAsyncThunk(
  "user/getUserMe",
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get("/users/me");
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to fetch user");
    }
  }
);

export const updateUser = createAsyncThunk("user/update", async (userData, thunkAPI) => {
  try {
    const response = await axiosClient.put("/users/me", userData);
    return response.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update user");
  }
});

export const uploadProfileImage = createAsyncThunk(
  "user/uploadProfileImage",
  async (formData, thunkAPI) => {
    try {
      const res = await axiosClient.post("users/profile/image", formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || "Image upload failed");
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  "user/updateProfileImage",
  async (formData, thunkAPI) => {
    try {
      const res = await axiosClient.put("/profile/image", formData);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || "Image update failed");
    }
  }
);

export const deleteProfileImage = createAsyncThunk(
  "user/deleteProfileImage",
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.delete("/profile/image");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || "Image delete failed");
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "user/getUserPosts",
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get("/posts/my");
      return res.data.posts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to fetch posts");
    }
  }
);

export const getFollowers = createAsyncThunk(
  "user/getFollowers",
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get("/users/followers");
      return res.data.followers;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to fetch followers");
    }
  }
);

export const getFollowing = createAsyncThunk(
  "user/getFollowing",
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get("/users/following");
      return res.data.following;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to fetch following");
    }
  }
);
