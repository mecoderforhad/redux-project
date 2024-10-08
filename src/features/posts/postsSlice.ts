import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = import.meta.env.VITE_API_URL + '/posts';
console.log('Fetching from:', POSTS_URL);

const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async()=> {
    console.log("calling==================")
    const response = await axios.get(POSTS_URL);

    console.log("data", response)

    return response.data; 
})

console.log("fetchPosts", fetchPosts())

const postSlice = createSlice({
    name: "posts", 
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
    },
    extraReducers(builder){
        builder.addCase(fetchPosts.pending, (state, action)=> {
            console.log('Fetching posts...');
            state.status = "loading"
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            console.log('Posts fetched successfully:', action.payload);
            state.status = 'succeeded'
            // Adding date and reactions
            let min = 1;
            const loadedPosts = action.payload.map(post => {
                post.date = sub(new Date(), { minutes: min++ }).toISOString();
                post.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                return post;
            });

            // Add any fetched posts to the array
            state.posts = state.posts.concat(loadedPosts)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            console.error('Failed to fetch posts:', action.error.message);
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export const { postAdded, reactionAdded } = postSlice.actions
export default postSlice.reducer