import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getToken = () => localStorage.getItem('jwtToken');    

export const fetchUserList = createAsyncThunk('fetchUserList', async () => {
    const token = getToken();
    try {
        const response = await fetch('http://localhost:8080/userList', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Server is not responding');
        return await response.json();
    } catch (error) {
        alert('Server is down!');
        throw new Error('Cannot connect to the server. Please try again later.');
    } 
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (userId, { rejectWithValue }) => {
    const token = getToken();
    try {
        const response = await fetch(`http://localhost:8080/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Server is not responding');
        return userId; 
    } catch (error) {
        alert("The user is a reference key to some movies!");
        return rejectWithValue('Cannot connect to the server. Please try again later.');
    }
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ userId, updatedUser }, { rejectWithValue }) => {
    const token = getToken();
    try {
        const response = await fetch(`http://localhost:8080/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedUser)
        });
        if (!response.ok) throw new Error(`Failed to update user: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchUserDetails = createAsyncThunk('fetchUserDetails', async (userId, { rejectWithValue }) => {
    const token = getToken();
    try {
        const response = await fetch(`http://localhost:8080/user?id=${userId}`, {
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


const userSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchUserList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.data = state.data.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.data.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
                state.isLoading = false;
            })  
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;  
            });
    }
});

export default userSlice.reducer;
