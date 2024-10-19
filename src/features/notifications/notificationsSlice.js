import { createSlice } from "@reduxjs/toolkit";

const initialState={
    items:[]
}

const notificationsSlice=createSlice({
    name:"notifications",
    initialState,
    reducers: {
        setNotifications: (state, action) => {
          state.items = action.payload;
        },
        addNotification: (state, action) => {
          state.items.unshift(action.payload);
        },
        removeNotification: (state, action) => {
          state.items = state.items.filter(
            (notification) => notification._id !== action.payload
          );
        },
        updateNotification: (state, action) => {
          const index = state.items.findIndex(
            (notification) => notification._id === action.payload._id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        },
      },
})

export const { setNotifications, addNotification, removeNotification, updateNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;