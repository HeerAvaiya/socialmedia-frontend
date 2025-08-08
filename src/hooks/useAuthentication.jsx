import { useDispatch, useSelector } from "react-redux";
import {
  loginAction,
  registerAction,
} from "../store/actions/auth.action";
import { clearAuthState } from "../store/reducers/auth.reducer";

export const useAuthentication = () => {
  const dispatch = useDispatch();
  const { user, token, loading, error, message } = useSelector((store) => store.auth);

  const login = (formData) => dispatch(loginAction(formData));
  const register = (formData) => dispatch(registerAction(formData));
  const clearAuth = () => dispatch(clearAuthState());

  return {
    user,
    token,
    loading,
    error,
    message,
    login,
    register,
    clearAuth,
  };
};



