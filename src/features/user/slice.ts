import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {apiUrl} from "../../config/api/url";

export const fetchAsyncGet = createAsyncThunk('users/get', async () => {
  const res = await axios.get(`${apiUrl}/user`, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
});

export const fetchAsyncGetAuth = createAsyncThunk('auth/get', async () => {
  const res = await axios.get(`${apiUrl}/user/auth`, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
});

export const fetchAsyncPutStamina = createAsyncThunk('auth/stamina', async (data:any) => {
  const res = await axios.put(`${apiUrl}/user/stamina`, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return res.data;
});

export const fetchAsyncEditAuth = createAsyncThunk('auth/edit', async (data:any) => {
  const res = await axios.put(`${apiUrl}/user/auth`, data, {
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
    authUser: {
      id: 0,
      name: '',
      rank: '',
      point: 0,
      stamina: 0,
      comment: '',
      icon_path: ''
    },
    selectedUser: {
      id: 0,
      name: '',
      rank: ''
    }
  },
  reducers: {
    decreaseStamina(state, action) {
      state.authUser.stamina--;
    },
    updatePoints(state, action) {
      state.authUser.point = action.payload.point;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload
      }
    });
    builder.addCase(fetchAsyncGetAuth.fulfilled, (state, action) => {
      return {
        ...state,
        authUser: action.payload
      }
    });
    builder.addCase(fetchAsyncPutStamina.fulfilled, (state, action) => {
      return {
        ...state,
        authUser: action.payload
      }
    });
    builder.addCase(fetchAsyncEditAuth.fulfilled, (state, action) => {
      return {
        ...state,
        authUser: action.payload
      }
    });
  }
});

export const {decreaseStamina, updatePoints} = usersSlice.actions;

export const selectUsers = (state: any) => {
  return state.user.users;
};

export const selectAuthUser = (state: any) => {
  return state.user.authUser;
};

export default usersSlice.reducer;
