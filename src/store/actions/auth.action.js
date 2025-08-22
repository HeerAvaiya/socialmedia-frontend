import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../libs/axios";

export const loginAction = createAsyncThunk(
    "auth/login",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axiosClient.post("/auth/login", formData);
            console.log('login', res);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.data?.message || { message: "Login failed" });
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