import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl: string = 'http://127.0.0.1:8080/api/v1/comment';

export const fetchAsyncGet = createAsyncThunk("comments/get", async () => {
  const res = await axios.get(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  console.log(res);
  return res.data;
});

export const fetchAsyncCreate = createAsyncThunk("comments/post", async (params: any) => {
  const data = {
    comment: params.comment,
    nominees: params.nominees
  }
  const res = await axios.post(apiUrl, data, {
    headers: {
      "Content-Type": "application/json",
    }
  })
  return res.data;
})

const comments = [
  {
    id: 0,
    user_id: 0,
    body: '',
    user: {},
    nominees: []
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
