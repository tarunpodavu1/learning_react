import { createSlice } from "@reduxjs/toolkit";

//Code for Auth Slice
const initialAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

//Exporting the actions to get dispatch work

export const authActions = authSlice.actions;

export default authSlice.reducer;
