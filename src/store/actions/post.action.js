import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../libs/axios";

export const createPost = createAsyncThunk(
    "post/create",
    async (formData, thunkAPI) => {
        try {
            const res = await axiosClient.post("/posts", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Failed to create post"
            );
        }
    }
);

export const getAllPosts = createAsyncThunk(
    "post/getAll",
    async (_, thunkAPI) => {
        try {
            const res = await axiosClient.get("/posts");
            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Failed to fetch posts"
            );
        }
    }
);

export const getUserPosts = createAsyncThunk(
    "post/getUserPosts",
    async (userId, thunkAPI) => {
        try {
            const res = await axiosClient.get(`/posts/user/${userId}`);
            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Failed to fetch user posts"
            );
        }
    }
);

export const getPostDetail = createAsyncThunk(
    "post/getDetail",
    async (postId, thunkAPI) => {
        try {
            const res = await axiosClient.get(`/posts/${postId}`);
            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Failed to fetch post detail"
            );
        }
    }
);


export const updatePostImage = createAsyncThunk(
    "post/updatePostImage",
    async ({ postId, formData }, thunkAPI) => {
        try {
            const res = await axiosClient.put(`/posts/${postId}/image`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data.post;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.error || "Failed to update post"
            );
        }
    }
);


export const deletePost = createAsyncThunk(
    "post/deletePost",
    async (postId, thunkAPI) => {
        try {
            await axiosClient.delete(`/posts/${postId}`);
            return postId;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.error || "Failed to delete post"
            );
        }
    }
);


export const toggleLike = createAsyncThunk(
    "post/toggleLike",
    async (postId, thunkAPI) => {
        try {
            const res = await axiosClient.post(`/posts/${postId}/like`);
            return res.data.post;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to toggle like");
        }
    }
);

export const getPostLikes = createAsyncThunk(
    "post/getLikes",
    async (postId, thunkAPI) => {
        try {
            const res = await axiosClient.get(`/posts/${postId}/likes`);
            return { postId, users: res.data.data };
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to get likes");
        }
    }
);

// export const createComment = createAsyncThunk(
//     "post/createComment",
//     async ({ postId, text }, thunkAPI) => {
//         try {
//             const res = await axiosClient.post(`/posts/${postId}/comments`, { text });
//             return { postId, comment: res.data.data };
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to create comment");
//         }
//     }
// );

// export const createComment = createAsyncThunk(
//     "post/createComment",
//     async ({ postId, text }, thunkAPI) => {
//         try {
//             const res = await axiosClient.post(`/posts/${postId}/comments`, { text });
//             // return full updated post
//             return res.data.post;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to create comment");
//         }
//     }
// );

export const createComment = createAsyncThunk(
    "post/createComment",
    async ({ postId, text }, thunkAPI) => {
        try {
            const res = await axiosClient.post(`/posts/${postId}/comments`, { text });
            return { postId, comment: res.data.data }; // return only new comment
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to create comment");
        }
    }
);

// export const updateComment = createAsyncThunk(
//     "post/updateComment",
//     async ({ commentId, text }, thunkAPI) => {
//         try {
//             const res = await axiosClient.put(`/posts/comments/${commentId}`, { text });
//             return res.data.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to update comment");
//         }
//     }
// );

// export const updateComment = createAsyncThunk(
//     "post/updateComment",
//     async ({ commentId, text }, thunkAPI) => {
//         try {
//             const res = await axiosClient.put(`/posts/comments/${commentId}`, { text });
//             return { comment: res.data.data, postId: res.data.data.postId }; // ensure postId included
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to update comment");
//         }
//     }
// );

export const updateComment = createAsyncThunk(
    "post/updateComment",
    async ({ commentId, text, postId }, thunkAPI) => {
        try {
            const res = await axiosClient.put(`/posts/comments/${commentId}`, { text });
            return { comment: res.data.data, postId };
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to update comment");
        }
    }
);

// export const deleteComment = createAsyncThunk(
//     "post/deleteComment",
//     async (commentId, thunkAPI) => {
//         try {
//             await axiosClient.delete(`/posts/comments/${commentId}`);
//             return commentId;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to delete comment");
//         }
//     }
// );

// export const deleteComment = createAsyncThunk(
//     "post/deleteComment",
//     async ({ commentId, postId }, thunkAPI) => {
//         try {
//             await axiosClient.delete(`/posts/comments/${commentId}`);
//             return { id: commentId, postId };
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to delete comment");
//         }
//     }
// );

export const deleteComment = createAsyncThunk(
    "post/deleteComment",
    async ({ commentId, postId }, thunkAPI) => {
        try {
            await axiosClient.delete(`/posts/comments/${commentId}`);
            return { id: commentId, postId };
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to delete comment");
        }
    }
);


// export const getPostComments = createAsyncThunk(
//     "post/getComments",
//     async (postId, thunkAPI) => {
//         try {
//             const res = await axiosClient.get(`/posts/${postId}/comments`);
//             return { postId, comments: res.data.data };
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to get comments");
//         }
//     }
// );


export const getPostComments = createAsyncThunk(
    "post/getComments",
    async (postId, thunkAPI) => {
        try {
            const res = await axiosClient.get(`/posts/${postId}/comments`);
            return { postId, comments: res.data.data };
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to get comments");
        }
    }
);

export const getFeedPosts = createAsyncThunk(
    "post/getFeedPosts",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosClient.get("/posts/feed");
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);