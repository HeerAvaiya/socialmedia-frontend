import { createSlice } from "@reduxjs/toolkit";
import {
  loginAction,
  registerAction,
  forgotPasswordAction,
  resetPasswordAction,
  logoutAction
} from "../actions/auth.action";


let user = null;
try {
  const storedUser = localStorage.getItem("user");
  if (storedUser) user = JSON.parse(storedUser);
} catch (err) {
  console.warn("Invalid user JSON in localStorage");
  localStorage.removeItem("user");
}


const initialState = {
  token: localStorage.getItem("token") || null,
  user,
  loading: false,
  error: null,
  message: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = null;
      state.message = null;
      state.profileImageUrl = null;
    },
    clearErrorAndMessage: (state) => {
      state.error = null;
      state.message = null;
    },
  },


  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.tokens.accessToken;
        state.message = "Login successful";
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })


      // Register
      .addCase(registerAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.message = "Registration successful";
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      })


      // forgotPasswordAction
      .addCase(forgotPasswordAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPasswordAction.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPasswordAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // resetPasswordAction
      .addCase(resetPasswordAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPasswordAction.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(resetPasswordAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      //logout
      .addCase(logoutAction.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.profileImageUrl = null;
        state.loading = false;
        state.error = null;
        state.message = null;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.error = action.payload || "Logout failed";
      });
  },
});

export const { clearAuthState, logout, clearErrorAndMessage } = authSlice.actions;

export default authSlice.reducer;          