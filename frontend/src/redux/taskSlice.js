import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axiosInstance';

export const fetchMyTasks = createAsyncThunk('task/fetchMyTasks', async (_, thunkAPI) => {
  try {
    const res = await axios.get('/tasks/my');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const startTask = createAsyncThunk('task/start', async (data, thunkAPI) => {
  try {
    const res = await axios.post('/tasks/start', data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const stopTask = createAsyncThunk('task/stop', async (id, thunkAPI) => {
  try {
    const res = await axios.patch(`/tasks/stop/${id}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

const taskSlice = createSlice({
  name: 'task',
  initialState: { tasks: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyTasks.pending, (state) => { state.loading = true; })
      .addCase(fetchMyTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchMyTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(startTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(stopTask.fulfilled, (state, action) => {
        const idx = state.tasks.findIndex(t => t._id === action.payload._id);
        if (idx > -1) state.tasks[idx] = action.payload;
      });
  },
});

export default taskSlice.reducer;