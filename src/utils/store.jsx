import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import moviesReducer from "./moviesSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    movie:moviesReducer,
  },
});

export default store;
