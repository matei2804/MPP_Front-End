import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlicer";

export const store = configureStore({
    reducer: {
        movieStore: movieReducer
    }
})