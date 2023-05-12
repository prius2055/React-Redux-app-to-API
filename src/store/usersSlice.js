import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://randomuser.me/api/?results=5';

// export const getUser = createAsyncThunk('user/getUser', () =>
//   fetch(url)
//     .then((res) => res.json())
//     .catch((err) => console.log(err))
// );

// USING AXIOS
export const getUser = createAsyncThunk('user', async (thunkAPI) => {
  try {
    const res = await axios(url);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Something went wrong');
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState: { users: [], isLoading: false, error: '' },
  reducers: {
    addUsers: (state) => {
      state.users.push('Anton');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.users = action.payload.results;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { addUsers } = userSlice.actions;
export default userSlice.reducer;
