import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  teamTasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    AddTasks: (state, action) => {
      state.tasks = action.payload;
    },
    pushTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    AddTeamTasks: (state, action) => {
      state.teamTasks = action.payload;
    },
    pushTaskToTeam: (state, action) => {
      state.teamTasks.push(action.payload);
    },
    updateteamTask: (state, action) => {
      const index = state.teamTasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index !== -1) {
        state.teamTasks[index] = action.payload;
      }
    },
    removeTaskFromTeam: (state, action) => {
        state.teamTasks = state.teamTasks.filter(
          (task) => task._id !== action.payload
        );
      },
  },
});
export default taskSlice.reducer;
export const {
  AddTasks,
  pushTask,
  AddTeamTasks,
  pushTaskToTeam,
  updateteamTask,
  removeTaskFromTeam
} = taskSlice.actions;
