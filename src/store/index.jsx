import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import userReducer from "./reducers/user.reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
