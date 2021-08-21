import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface CommentState {
  id: number,
  user_id: number,
  body: string,
}

const apiUrl: string = 'http://localhost:3001/comments';

export const fetchAsyncGet = createAsyncThunk("comments/get", async () => {
  const res = await axios.get(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
});

export const fetchAsyncCreate = createAsyncThunk("comments/post", async (comment: string) => {
  const res = await axios.post(apiUrl, {user_id: 1, body: comment}, {
    headers: {
      "Content-Type": "application/json",
    }
  })
  return res.data;
})

const comments: CommentState[] = [
  {
    id: 0,
    user_id: 0,
    body: ''
  }
];

export const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload
      };
    });
    builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
      return {
        ...state,
        comments: [action.payload, ...state.comments]
      };
    });
  }
})

// export const selectComments = (state: any) => state.comment.comments;
export const selectComments = (state: any) => {
  return state.comment.comments;
};

export default commentSlice.reducer;
