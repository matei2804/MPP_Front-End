import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getToken = () => localStorage.getItem('jwtToken');

export const fetchMovieList = createAsyncThunk('fetchMovieList', async (_, { rejectWithValue }) => {
    const token = getToken(); 
    try {
        const response = await fetch('http://localhost:8080/movieList', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Server is not responding');
        return await response.json();
    } catch (error) {
        alert('Server is down!');
        return rejectWithValue('Cannot connect to the server. Please try again later.');
    }
});

export const deleteMovie = createAsyncThunk('movie/deleteMovie', async (movieId, { rejectWithValue }) => {
    const token = getToken();
    try {
        const response = await fetch(`http://localhost:8080/movie/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Server is not responding');
        return movieId;
    } catch (error) {
        alert('Server is down!');
        return rejectWithValue('Cannot connect to the server. Please try again later.');
    }
});

export const fetchMovieDetails = createAsyncThunk('fetchMovieDetails', async (movieId, { rejectWithValue }) => {
    const token = getToken();
    try {
        const response = await fetch(`http://localhost:8080/movie?id=${movieId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Server is not responding');
        return await response.json();
    } catch (error) {
        alert('Server is down!');
        return rejectWithValue(error.message);
    }
});

export const updateMovie = createAsyncThunk('movie/updateMovie', async ({ movieId, updatedMovie }, { rejectWithValue }) => {
    const token = getToken();
    try {
        const response = await fetch(`http://localhost:8080/movie/${movieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
    name: 'movies',
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
        builder
            .addCase(fetchMovieList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMovieList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchMovieList.rejected, (state) => {
                state.error = true;
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                state.data = state.data.filter((movie) => movie.id !== action.payload);
            })
            .addCase(updateMovie.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateMovie.fulfilled, (state, action) => {
                const index = state.data.findIndex((movie) => movie.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(updateMovie.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movie = action.payload;
            });
    }
});

export const { addMovie } = movieSlice.actions;
export default movieSlice.reducer;
