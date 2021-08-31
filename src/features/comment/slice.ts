import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {apiUrl} from "../../config/api/url";

export const fetchAsyncGet = createAsyncThunk("comments/get", async (page: number) => {
  const res = await axios.get(`${apiUrl}/comment/${page}`, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
});

export const fetchAsyncCreate = createAsyncThunk("comments/post", async (data: any) => {
  const res = await axios.post(`${apiUrl}/comment`, data, {
    headers: {
      "Content-Type": "application/json",
    }
  })
  return res.data;
});

export const fetchAsyncCreateReaction = createAsyncThunk('reactions/create', async (data: any) => {
  const res = await axios.post(`${apiUrl}/reaction`, data, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
});

const user = {
  id: 0,
  name: '',
  comment: '',
  rank: 'bronze'
};

const comments = [
  {
    reaction_count: 0,
    user,
    comment: {
      text: '',
      id: 0
    },
    nominees: [user]
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
    builder.addCase(fetchAsyncCreateReaction.fulfilled, (state, action) => {
      return {
        ...state,
        comments: state.comments.map((comment: any) => {
          return comment.id === action.payload.id ? action.payload : comment;
        })
      };
    });
  }
})

// export const selectComments = (state: any) => state.comment.comments;
export const selectComments = (state: any) => {
  return state.comment.comments;
};

export default commentSlice.reducer;
