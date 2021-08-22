import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const apiUrl: string = 'http://localhost:3001/prizeExchangeHistories';

export const fetchAsyncGet = createAsyncThunk('prizeExchangeHistories/get', async () => {
  const res = await axios.get(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
});

export const fetchAsyncCreate = createAsyncThunk('prizeExchangeHistories/create', async (params: any) => {
  const data = {
    user_id: params.user_id,
    prize_id: params.prize_id,
  };
  const res = await axios.post(apiUrl, data, {
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
