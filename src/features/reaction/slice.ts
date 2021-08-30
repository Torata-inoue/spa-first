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
  }
});

const selectReactions = (state: any) => {
  return state.reaction.reactions;
};

export default reactionSlice.reducer;
