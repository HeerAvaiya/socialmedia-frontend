import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, token, loading } = useSelector((state) => state.auth);

  const logoutUser = () => dispatch(logout());

  return (
    <AuthContext.Provider value={{ user, token, loading, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
