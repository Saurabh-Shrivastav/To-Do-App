import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch tasks using fetch
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();
  return data.slice(0, 10); // 10 tasks limit
});

// Redux slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], status: 'idle' },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.status = 'succeeded';
      });
  },
});

export const { addTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;