import { createSlice } from '@reduxjs/toolkit';

export const connectionSlice = createSlice({
    name: 'connection',
    initialState: {
        isOnline: navigator.onLine  
    },
    reducers: {
        setOnline: (state, action) => {
            state.isOnline = true;
        },
        setOffline: (state, action) => {
            state.isOnline = false;
        }
    }
});

export const { setOnline, setOffline } = connectionSlice.actions;
export default connectionSlice.reducer;
