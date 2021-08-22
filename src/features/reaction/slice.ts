import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl: string = 'http://localhost:3001/reactions';

export const fetchAsyncGet = createAsyncThunk('reactions/get', async () => {
  const res = await axios.get(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
});

export const fetchAsyncCreate = createAsyncThunk('reactions/create', async (params: any) => {
  const data = {
    user_id: params.user_id,
    target_id: params.target_id,
  };
  const res = await axios.post(apiUrl, data, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
});

export const reactionSlice = createSlice({
  name: 'reaction',
  initialState: {
    reactions: [
      {
        id: 0,
        user_id: 0,
        target_id: 0
      }
    ]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        reactions: action.payload
      };
    });
    builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
      return {
        ...state,
        reactions: [action.payload, ...state.reactions]
      };
    });
  }
});

const selectReactions = (state: any) => {
  return state.reaction.reactions;
};

export default reactionSlice.reducer;
