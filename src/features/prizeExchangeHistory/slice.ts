import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import {apiUrl} from "../../config/api/url";

export const fetchAsyncGet = createAsyncThunk('prizeExchangeHistories/get', async () => {
  const res = await axios.get(`${apiUrl}/prizeExchangeHistory`, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
});

export const fetchAsyncCreate = createAsyncThunk('prizeExchangeHistories/create', async (prize_id: number) => {
  const res = await axios.post(`${apiUrl}/prizeExchangeHistory`, {prize_id}, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
});

export const prizeExchangeHistoriesSlice = createSlice({
  name: 'prizeExchangeHistory',
  initialState: {
    prizeExchangeHistories: [
      {
        id: 0,
        user_id: 0,
        prize_id: 0
      }
    ]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        prizeExchangeHistories: action.payload
      };
    });
    builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
      return {
        ...state,
        prizeExchangeHistories: [action.payload, ...state.prizeExchangeHistories]
      };
    });
  }
})

export const selectPrizeExchangeHistories = (state: any) => {
  return state.prizeExchangeHistory.prizeExchangeHistories;
};

export default prizeExchangeHistoriesSlice.reducer;
