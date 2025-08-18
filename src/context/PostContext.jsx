import { createContext, useContext } from "react";
import { useSelector } from "react-redux";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const posts = useSelector((state) => state.post);
  return <PostContext.Provider value={posts}>{children}</PostContext.Provider>;
};

export const usePosts = () => useContext(PostContext);