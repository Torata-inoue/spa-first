import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl: string = 'http://localhost:3001/users';

export const fetchAsyncGet = createAsyncThunk('users/get', async () => {
  const res = await axios.get(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
});

export const usersSlice = createSlice({
  name: 'user',
  initialState: {
    users: [
      {
        id: 0,
        name: ''
      }
    ],
    selectedUser: {
      id: 0,
      name: '',
      stamina: 0
    }
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload
      }
    });
  }
});

export const selectUsers = (state: any) => {
  return state.user.users;
};

export default usersSlice.reducer;
