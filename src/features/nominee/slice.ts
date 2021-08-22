import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = 'http://localhost:3001/nominees';

export const fetchAsyncGet = createAsyncThunk("nominees/get", async () => {
  const res = await axios.get(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
})

export const fetchAsyncCreate = createAsyncThunk("nominees/create", async (params: any) => {
  const res = await axios.post(apiUrl, {user_id: params.user_id, comment_id: params.comment_id}, {
    headers: {
      "Content-Type": "application/json",
    }
  })
  return res.data;
});

export const nomineeSlice = createSlice({
  name: 'nominee',
  initialState: {
    nominees: [
      {
        id: 0,
        user_id: 0,
        comment_id: 0
      }
    ]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        nominees: action.payload
      };
    });
    builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
      return {
        ...state,
        nominees: [action.payload, ...state.nominees]
      };
    });
  }
})

export const selectNominees = (state: any) => state.nominee.nominees;

export default nomineeSlice.reducer;
