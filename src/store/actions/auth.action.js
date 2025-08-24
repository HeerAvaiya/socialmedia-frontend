import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../libs/axios";


export const loginAction = createAsyncThunk(
    "auth/login",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axiosClient.post("/auth/login", formData);
            const { user, tokens } = res.data.data;
            localStorage.setItem("token", tokens.accessToken);
            localStorage.setItem("user", JSON.stringify(user));
            return res.data.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || { message: "Login failed" }
            );
        }
    }
);


export const registerAction = createAsyncThunk(
    "auth/register",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axiosClient.post("/auth/register", formData);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.data?.message || { message: "Registration failed" });
        }
    }
);


export const forgotPasswordAction = createAsyncThunk(
    "auth/forgotPassword",
    async (email, { rejectWithValue }) => {
        try {
            const res = await axiosClient.post("/users/forgot-password", { email });
            return res.data.message;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Something went wrong");
        }
    }
);



export const resetPasswordAction = createAsyncThunk(
    "auth/resetPassword",
    async ({ token, password }, { rejectWithValue }) => {
        try {
            const res = await axiosClient.post(`/users/reset-password/${token}`, { password });
            return res.data.message;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Reset failed");
        }
    }
);


export const logoutAction = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("profileImageUrl");
            localStorage.removeItem("following");
            return true;
        } catch (err) {
            return rejectWithValue("Logout failed");
        }
    }
);