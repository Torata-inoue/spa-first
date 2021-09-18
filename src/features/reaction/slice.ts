import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {apiUrl} from "../../config/api/url";

export const fetchAsyncGet = createAsyncThunk('reactions/get', async () => {
  const res = await axios.get(`${apiUrl}/reaction`, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
});

const init = {
  created_at: '',
  target: {name: ''},
  comment: ''
};

export const reactionSlice = createSlice({
  name: 'reaction',
  initialState: {
    reactions: {
      receive: [init],
      send: [init]
    }
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        reactions: action.payload
      };
    });
  }
});

export const selectReactions = (state: any) => {
  return state.reaction.reactions;
};

export default reactionSlice.reducer;
