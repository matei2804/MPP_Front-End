import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlicer";
import userReducer from "./userSlicer";


export const store = configureStore({
    reducer: {
        movieStore: movieReducer,
        users: userReducer
    }
})