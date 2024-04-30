import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovieList = createAsyncThunk("fetchMovieList", async() => {

    try {
        const response = await fetch('http://localhost:8080/movieList');
        if (!response.ok) throw new Error('Server is not responding');
        return await response.json();
    } catch (error) {
        alert('Server is down!');
        return rejectWithValue('Cannot connect to the server. Please try again later.');
    }   
})

export const deleteMovie = createAsyncThunk('movie/deleteMovie', async (movieId, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:8080/movie/${movieId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Server is not responding');
        return movieId; 
    } catch (error) {
        alert('Server is down!');
        return rejectWithValue('Cannot connect to the server. Please try again later.');
    }
});

export const fetchMovieDetails = createAsyncThunk('fetchMovieDetails', async (movieId, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:8080/movie?id=${movieId}`);
        if (!response.ok) throw new Error('Server is not responding');
        return await response.json(); 
    } catch (error) {
        alert('Server is down!');
        return rejectWithValue(error.message);
    }
});


export const updateMovie = createAsyncThunk('movie/updateMovie', async ({ movieId, updatedMovie }, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:8080/movie/${movieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedMovie)
        });
        if (!response.ok) throw new Error(`Failed to update movie: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


const movieSlice = createSlice({
    name: 'movieS',
    initialState: {
        isLoading: false,
        data: null,
        movie: null,
        error: false
    },
    reducers: {
        addMovie(state, action) {
            state.data.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovieList.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchMovieList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchMovieList.rejected, (state, action) => {
            state.error = true;
        });
        builder.addCase(deleteMovie.fulfilled, (state, action) => {
            state.data = state.data.filter(movie => movie.id !== action.payload);
        });
        builder.addCase(updateMovie.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateMovie.fulfilled, (state, action) => {
            const index = state.data.findIndex(movie => movie.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
        });  
        builder.addCase(updateMovie.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.movie = action.payload;  
        });
        
    }
})

export const { addMovie } = movieSlice.actions;
export default movieSlice.reducer;
