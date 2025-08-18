import { createSlice } from "@reduxjs/toolkit";
import {
    createPost,
    getAllPosts,
    getUserPosts,
    getPostDetail,
    updatePostImage,
    deletePost,
    toggleLike,
    getPostLikes,
    createComment,
    updateComment,
    deleteComment,
    getPostComments,
    getFeedPosts
} from "../actions/post.action";

const initialState = {
    posts: [],
    userPosts: [],
    postDetail: null,
    loading: false,
    error: null,
    message: null,
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        clearPostState: (state) => {
            state.error = null;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // ✅ Create Post
            .addCase(createPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = [action.payload, ...state.posts];
                state.message = "Post created successfully";
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Get All Posts
            .addCase(getAllPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Get User Posts
            .addCase(getUserPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.userPosts = action.payload;
            })
            .addCase(getUserPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Get Post Detail
            .addCase(getPostDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPostDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.postDetail = action.payload;
            })
            .addCase(getPostDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Update Post Image
            .addCase(updatePostImage.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePostImage.fulfilled, (state, action) => {
                state.loading = false;
                const updatedPost = action.payload;
                state.userPosts = state.userPosts.map((post) =>
                    post.id === updatedPost.id ? updatedPost : post
                );
            })
            .addCase(updatePostImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // ✅ Delete Post
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = action.payload;
                state.userPosts = state.userPosts.filter((post) => post.id !== deletedId);
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })










            .addCase(toggleLike.pending, (state) => {
                state.loading = true;
            })
            .addCase(toggleLike.fulfilled, (state, action) => {
                state.loading = false;
                const updatedPost = action.payload;
                const index = state.posts.findIndex(p => p.id === updatedPost.id);
                if (index !== -1) {
                    state.posts[index] = updatedPost;
                }
                const userIndex = state.userPosts.findIndex(p => p.id === updatedPost.id);
                if (userIndex !== -1) {
                    state.userPosts[userIndex] = updatedPost;
                }
            })
            .addCase(toggleLike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })









            // ✅ Get Likes
            .addCase(getPostLikes.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPostLikes.fulfilled, (state, action) => {
                state.loading = false;
                const { postId, users } = action.payload;
                const post = state.posts.find((p) => p.id === postId);
                if (post) {
                    post.likes = users;
                }
                state.message = "Fetched post likes successfully";
            })
            .addCase(getPostLikes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Create Comment
            .addCase(createComment.pending, (state) => {
                state.loading = true;
            })
            // .addCase(createComment.fulfilled, (state, action) => {
            //     state.loading = false;
            //     const { postId, comment } = action.payload;
            //     const post = state.posts.find((p) => p.id === postId);
            //     if (post) {
            //         post.comments = [comment, ...(post.comments || [])];
            //         post.commentCount = (post.commentCount || 0) + 1;
            //     }
            //     state.message = "Comment added successfully";
            // })

            .addCase(createComment.fulfilled, (state, action) => {
                const newComment = action.payload;
                const post = state.userPosts.find((p) => p.id === newComment.postId);
                if (post) {
                    if (!post.comments) post.comments = [];
                    post.comments.push(newComment);
                    post.commentCount = (post.commentCount || 0) + 1;
                }
            })

            .addCase(createComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            // ✅ Update Comment
            .addCase(updateComment.pending, (state) => {
                state.loading = true;
            })

            // .addCase(updateComment.fulfilled, (state, action) => {
            //     state.loading = false;
            //     const updatedComment = action.payload;
            //     state.posts.forEach((post) => {
            //         if (post.comments) {
            //             post.comments = post.comments.map((c) =>
            //                 c.id === updatedComment.id ? updatedComment : c
            //             );
            //         }
            //     });
            //     state.message = "Comment updated successfully";
            // })

            .addCase(updateComment.fulfilled, (state, action) => {
                const updatedComment = action.payload;
                const post = state.userPosts.find((p) => p.id === updatedComment.postId);
                if (post && post.comments) {
                    const idx = post.comments.findIndex((c) => c.id === updatedComment.id);
                    if (idx !== -1) {
                        post.comments[idx] = updatedComment;
                    }
                }
            })

            .addCase(updateComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Delete Comment
            .addCase(deleteComment.pending, (state) => {
                state.loading = true;
            })

            // .addCase(deleteComment.fulfilled, (state, action) => {
            //     state.loading = false;
            //     const deletedId = action.payload;
            //     state.posts.forEach((post) => {
            //         if (post.comments) {
            //             post.comments = post.comments.filter((c) => c.id !== deletedId);
            //             post.commentCount = Math.max((post.commentCount || 1) - 1, 0);
            //         }
            //     });
            //     state.message = "Comment deleted successfully";
            // })

            .addCase(deleteComment.fulfilled, (state, action) => {
                const { id, postId } = action.payload;
                const post = state.userPosts.find((p) => p.id === postId);
                if (post && post.comments) {
                    post.comments = post.comments.filter((c) => c.id !== id);
                    post.commentCount = Math.max((post.commentCount || 1) - 1, 0);
                }
            })

            .addCase(deleteComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Get Post Comments
            .addCase(getPostComments.pending, (state) => {
                state.loading = true;
            })
            // .addCase(getPostComments.fulfilled, (state, action) => {
            //     state.loading = false;
            //     const { postId, comments } = action.payload;
            //     const post = state.posts.find((p) => p.id === postId);
            //     if (post) {
            //         post.comments = comments;
            //     }
            //     state.message = "Fetched post comments successfully";
            // })

            .addCase(getPostComments.fulfilled, (state, action) => {
                state.loading = false;
                const { postId, comments } = action.payload;

                // posts array update
                const post = state.posts.find((p) => p.id === postId);
                if (post) {
                    post.comments = comments;
                    console.log("Fetched comments:", comments);
                }

                // 🔥 userPosts array update
                const userPost = state.userPosts.find((p) => p.id === postId);
                if (userPost) {
                    userPost.comments = comments;
                }

                state.message = "Fetched post comments successfully";
            })

            .addCase(getPostComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // .addCase(getFeedPosts.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(getFeedPosts.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.posts = action.payload;
            // })
            // .addCase(getFeedPosts.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            // });


            .addCase(getFeedPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFeedPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.feedPosts = action.payload;
            })
            .addCase(getFeedPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { clearPostState } = postSlice.actions;
export default postSlice.reducer;
