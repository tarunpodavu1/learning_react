import { createSlice } from "@reduxjs/toolkit";

//Code for Counter Slice
const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter = state.counter + 1;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

//Exporting the actions to get dispatch work

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
