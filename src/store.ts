import { configureStore } from "@reduxjs/toolkit";
import { useSelector as rawUseSelector, TypedUseSelectorHook } from "react-redux";
import { commentSlice } from './features/comment/slice';
import { pointHistoriesSlice } from "./features/pointHistory/slice";
import { prizeSlice } from "./features/prize/slice";
import { prizeExchangeHistoriesSlice } from "./features/prizeExchangeHistory/slice";
import { reactionSlice } from "./features/reaction/slice";
import { usersSlice } from "./features/user/slice";

export const store = configureStore({
  reducer: {
    comment: commentSlice.reducer,
    pointHistory: pointHistoriesSlice.reducer,
    prize: prizeSlice.reducer,
    prizeExchangeHistory: prizeExchangeHistoriesSlice.reducer,
    reaction: reactionSlice.reducer,
    user: usersSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
