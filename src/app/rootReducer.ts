import { combineReducers } from '@reduxjs/toolkit'
import taskSlice from "../ducks/task/taskSlice"

const rootReducer = combineReducers({
  tasks: taskSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
