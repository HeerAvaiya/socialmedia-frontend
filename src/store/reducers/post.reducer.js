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
    feedPosts: [],
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
            //  Create Post
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

            //  Get All Posts
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

            //  Get User Posts
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

            //  Get Post Detail
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

            //  Update Post Image
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


            //  Delete Post
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


            // toggleLike
            .addCase(toggleLike.pending, (state) => {
                // state.loading = true;
            })

            // .addCase(toggleLike.fulfilled, (state, action) => {
            //     const updatedPost = action.payload;
            //     const feedIndex = state.feedPosts.findIndex(p => p.id === updatedPost.id);
            //     if (feedIndex !== -1) {
            //         state.feedPosts[feedIndex] = updatedPost;
            //     }
            //     const index = state.posts.findIndex(p => p.id === updatedPost.id);
            //     if (index !== -1) {
            //         state.posts[index] = updatedPost;
            //     }
            //     const userIndex = state.userPosts.findIndex(p => p.id === updatedPost.id);
            //     if (userIndex !== -1) {
            //         state.userPosts[userIndex] = updatedPost;
            //     }
            // })


            .addCase(toggleLike.fulfilled, (state, action) => {
                const updatedPost = action.payload;
                if (!updatedPost || !updatedPost.id) return;

                const feedIndex = state.feedPosts.findIndex(p => p?.id === updatedPost.id);
                if (feedIndex !== -1) state.feedPosts[feedIndex] = updatedPost;

                const index = state.posts.findIndex(p => p?.id === updatedPost.id);
                if (index !== -1) state.posts[index] = updatedPost;

                const userIndex = state.userPosts.findIndex(p => p?.id === updatedPost.id);
                if (userIndex !== -1) state.userPosts[userIndex] = updatedPost;
            })

            .addCase(toggleLike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            //  Get Likes
            .addCase(getPostLikes.pending, (state) => {
                // state.loading = true;
            })


            // .addCase(getPostLikes.fulfilled, (state, action) => {
            //     state.loading = false;
            //     const { postId, users } = action.payload;
            //     const post = state.posts.find((p) => p.id === postId);
            //     if (post) {
            //         post.likes = users;
            //     }
            //     const userPost = state.userPosts.find((p) => p.id === postId);
            //     if (userPost) {
            //         userPost.likes = users;
            //     }
            //     const feedPost = state.feedPosts.find((p) => p.id === postId);
            //     if (feedPost) {
            //         feedPost.likes = users;
            //     }
            //     // state.message = "Fetched post likes successfully";
            // })

            .addCase(getPostLikes.fulfilled, (state, action) => {
                state.loading = false;
                const { postId, users } = action.payload;
                if (!postId) return;

                const putLikes = (post) => { if (post) post.likes = users; };
                putLikes(state.posts.find(p => p?.id === postId));
                putLikes(state.userPosts.find(p => p?.id === postId));
                putLikes(state.feedPosts.find(p => p?.id === postId));
            })

            .addCase(getPostLikes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            // Create Comment
            .addCase(createComment.pending, (state) => {
                // state.loading = true;
            })

            // .addCase(createComment.fulfilled, (state, action) => {
            //     const { postId, comment } = action.payload;
            //     const touch = (post) => {
            //         if (post) {
            //             if (!post.comments) post.comments = [];
            //             post.comments.push(comment);
            //             post.commentCount = (post.commentCount || 0) + 1;
            //         }
            //     };
            //     touch(state.posts.find(p => p.id === postId));
            //     touch(state.userPosts.find(p => p.id === postId));
            //     touch(state.feedPosts.find(p => p.id === postId));
            // })

            // .addCase(createComment.fulfilled, (state, action) => {
            //     const updatedPost = action.payload;
            //     if (!updatedPost?.id) return; // safeguard

            //     const update = (arr) => {
            //         const index = arr.findIndex(p => p?.id === updatedPost.id);
            //         if (index !== -1) arr[index] = updatedPost;
            //     };

            //     update(state.posts);
            //     update(state.userPosts);
            //     update(state.feedPosts);
            // })

            .addCase(createComment.fulfilled, (state, action) => {
                const { postId, comment } = action.payload || {};
                if (!postId || !comment) return;

                const insert = (post) => {
                    if (post?.id === postId) {
                        if (!post.comments) post.comments = [];
                        post.comments.push(comment);
                        post.commentCount = (post.commentCount || 0) + 1;
                    }
                };

                state.posts.forEach(insert);
                state.userPosts.forEach(insert);
                state.feedPosts.forEach(insert);
            })

            .addCase(createComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            //  Update Comment
            .addCase(updateComment.pending, (state) => {
                // state.loading = true;
            })

            // .addCase(updateComment.fulfilled, (state, action) => {
            //     const updatedComment = action.payload;
            //     const updateIn = (post) => {
            //         if (post && post.comments) {
            //             const idx = post.comments.findIndex((c) => c.id === updatedComment.id);
            //             if (idx !== -1) {
            //                 post.comments[idx] = updatedComment;
            //             }
            //         }
            //     };
            //     updateIn(state.posts.find((p) => p.id === updatedComment.postId));
            //     updateIn(state.userPosts.find((p) => p.id === updatedComment.postId));
            //     updateIn(state.feedPosts.find((p) => p.id === updatedComment.postId));
            //     state.loading = false;
            // })

            // .addCase(updateComment.fulfilled, (state, action) => {
            //     const { comment: updatedComment, postId } = action.payload || {};
            //     if (!updatedComment?.id || !postId) return;

            //     const updateIn = (post) => {
            //         if (post?.comments) {
            //             const idx = post.comments.findIndex(c => c.id === updatedComment.id);
            //             if (idx !== -1) post.comments[idx] = updatedComment;
            //         }
            //     };

            //     updateIn(state.posts.find(p => p?.id === postId));
            //     updateIn(state.userPosts.find(p => p?.id === postId));
            //     updateIn(state.feedPosts.find(p => p?.id === postId));
            // })

            // .addCase(updateComment.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            // })

            .addCase(updateComment.fulfilled, (state, action) => {
                const { comment: updatedComment, postId } = action.payload || {};
                if (!updatedComment?.id || !postId) return;

                const updateIn = (post) => {
                    if (post?.id === postId && Array.isArray(post.comments)) {
                        const idx = post.comments.findIndex(c => c.id === updatedComment.id);
                        if (idx !== -1) post.comments[idx] = updatedComment;
                    }
                };

                state.posts.forEach(updateIn);
                state.userPosts.forEach(updateIn);
                state.feedPosts.forEach(updateIn);
            })

            // Delete Comment
            .addCase(deleteComment.pending, (state) => {
                // state.loading = true;
            })


            // .addCase(deleteComment.fulfilled, (state, action) => {
            //     const { id, postId } = action.payload;
            //     const drop = (post) => {
            //         if (post && post.comments) {
            //             post.comments = post.comments.filter(c => c.id !== id);
            //             post.commentCount = Math.max((post.commentCount || 1) - 1, 0);
            //         }
            //     };
            //     drop(state.posts.find(p => p.id === postId));
            //     drop(state.userPosts.find(p => p.id === postId));
            //     drop(state.feedPosts.find(p => p.id === postId));
            // })

            .addCase(deleteComment.fulfilled, (state, action) => {
                const { id, postId } = action.payload || {};
                if (!id || !postId) return;

                const drop = (post) => {
                    if (post?.id === postId && Array.isArray(post.comments)) {
                        post.comments = post.comments.filter(c => c.id !== id);
                        post.commentCount = Math.max((post.commentCount || 1) - 1, 0);
                    }
                };

                state.posts.forEach(drop);
                state.userPosts.forEach(drop);
                state.feedPosts.forEach(drop);
            })


            .addCase(deleteComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            //  Get Post Comments
            .addCase(getPostComments.pending, (state) => {
                // state.loading = true;
            })

            // .addCase(getPostComments.fulfilled, (state, action) => {
            //     const { postId, comments } = action.payload;
            //     const put = (post) => { if (post) post.comments = comments; };
            //     put(state.posts.find(p => p.id === postId));
            //     put(state.userPosts.find(p => p.id === postId));
            //     put(state.feedPosts.find(p => p.id === postId));
            // })

            // .addCase(getPostComments.fulfilled, (state, action) => {
            //     const { postId, comments } = action.payload;
            //     if (!postId) return;

            //     const putComments = (post) => { if (post) post.comments = comments; };
            //     putComments(state.posts.find(p => p?.id === postId));
            //     putComments(state.userPosts.find(p => p?.id === postId));
            //     putComments(state.feedPosts.find(p => p?.id === postId));
            // })

            // .addCase(getPostComments.fulfilled, (state, action) => {
            //     const { postId, comments } = action.payload || {};
            //     if (!postId || !Array.isArray(comments)) return;

            //     const update = (post) => { if (post) post.comments = comments; };
            //     update(state.posts.find(p => p?.id === postId));
            //     update(state.userPosts.find(p => p?.id === postId));
            //     update(state.feedPosts.find(p => p?.id === postId));
            // })

            .addCase(getPostComments.fulfilled, (state, action) => {
                const { postId, comments } = action.payload || {};
                if (!postId || !Array.isArray(comments)) return;

                const update = (post) => {
                    if (post?.id === postId) {
                        post.comments = comments;
                        post.commentCount = comments.length;
                    }
                };

                state.posts.forEach(update);
                state.userPosts.forEach(update);
                state.feedPosts.forEach(update);
            })

            .addCase(getPostComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            //  Get Feed Posts
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
            });

    },
});

export const { clearPostState } = postSlice.actions;
export default postSlice.reducer;
