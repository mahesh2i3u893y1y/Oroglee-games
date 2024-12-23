import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [], // List of users
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push({...action.payload , hasPlayed: false}); // Add new user
    },
    editUser: (state, action) => {
      const { id, updatedUser } = action.payload;
      const index = state.users.findIndex(user => user.id === id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...updatedUser };
      }
    },
    markAsPlayed: (state, action) => {
      const { id } = action.payload;
      const index = state.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        state.users[index].hasPlayed = true;
      }
    },
  },
});

export const { addUser, editUser,markAsPlayed } = userSlice.actions;
export default userSlice.reducer;
