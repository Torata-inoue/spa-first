import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import {apiUrl} from "../../config/api/url";

export const fetchAsyncGet = createAsyncThunk('pointHistories/get', async () => {
  const res = await axios.get(`${apiUrl}/pointHistory`, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
});

export const fetchAsyncCreate = createAsyncThunk('pointHistories/create', async (user_id: number) => {
  const res = await axios.post(apiUrl, {user_id}, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
})

export const pointHistoriesSlice = createSlice({
  name: 'pointHistory',
  initialState: {
    pointHistories: [
      {
        id: 0,
        user_id: 0,
      }
    ],
    count : 0
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        pointHistories: action.payload
      };
    });
    builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
      return {
        ...state,
        pointHistories: [action.payload, ...state.pointHistories]
      };
    });
  }
})

export const selectPointHistories = (state: any) => {
  return state.pointHistory.pointHistories;
};

export default pointHistoriesSlice.reducer;
