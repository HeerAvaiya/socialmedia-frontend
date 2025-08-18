import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import userReducer from "./reducers/user.reducer";
import postReducer from "./reducers/post.reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postReducer
  },
});

export default store;
