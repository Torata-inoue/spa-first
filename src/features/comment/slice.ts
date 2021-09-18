import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {apiUrl} from "../../config/api/url";
import {user as userType} from "../user/types";
import {comment as commentType} from "./types";

export const fetchAsyncGet = createAsyncThunk("comments/get", async (page: number) => {
  const res = await axios.get(`${apiUrl}/comment/${page}`, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
});

export const fetchAsyncCreate = createAsyncThunk("comments/post", async (data: {comment: string, nominees: number[]}) => {
  const res = await axios.post(`${apiUrl}/comment`, data, {
    headers: {
      "Content-Type": "application/json",
    }
  })
  return res.data;
});

export const fetchAsyncCreateReaction = createAsyncThunk('reactions/create', async (data: {comment_id: number, target_id: number}) => {
  const res = await axios.post(`${apiUrl}/reaction`, data, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
});

const user: userType = {
  comment: '',
  icon_path: '',
  id: 0,
  name: '',
  point: 0,
  rank: 'bronze',
  stamina: 0
};

const comments: commentType[] = [
  {
    comment: {
      id: 0,
      text: ''
    },
    nominees: [user],
    user,
    reaction_count: 0
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
          console.log(comment.comment.id);
          return comment.comment.id === action.payload.comment.id ? action.payload : comment;
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
