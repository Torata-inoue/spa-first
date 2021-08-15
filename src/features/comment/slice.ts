import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface CommentState {
  id: number,
  user_id: number,
  body: string,
}

const apiUrl: string = 'http://localhost:3000/comments';

export const fetchAsyncGet = createAsyncThunk("comments/get", async () => {
  const res = await axios.get(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
});

const initialState: CommentState[] = [];

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload
      };
    });
  }
})

// export const selectComments = (state: any) => state.comment.comments;
export const selectComments = (state: any) => {
  console.log(state);
  return state.comment.comments;
};

export default commentSlice.reducer;
