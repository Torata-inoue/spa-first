import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const apiUrl: string = 'http://localhost:3001/prizes';

export const fetchAsyncGet = createAsyncThunk('prizes/get', async () => {
  const res = await axios.get(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
});

export const fetchAsyncCreate = createAsyncThunk('prizes/create', async (params: any) => {
  const data = {
    name: params.name,
    description: params.description,
    point: params.point
  }
  const res = await axios.post(apiUrl, data, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
});

export const prizeSlice = createSlice({
  name: 'prize',
  initialState: {
    prizes: [
      {
        id: 0,
        name: 0,
        description: '',
        point: 0,
      }
    ]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        prizes: action.payload
      }
    });
    builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
      return {
        ...state,
        prizes: [action.payload, ...state.prizes]
      };
    });
  }
})

export const selectPrizes = (state:any) => {
  return state.prize.prizes;
};

export default prizeSlice.reducer;
