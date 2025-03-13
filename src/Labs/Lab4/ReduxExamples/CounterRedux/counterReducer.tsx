import { createSlice } from "@reduxjs/toolkit";

// Define an interface for your counter state
interface CounterState {
  count: number;
}

// Annotate your initial state with the CounterState type
const initialState: CounterState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state: CounterState) => {
      state.count = state.count + 1;
    },
    decrement: (state: CounterState) => {
      state.count = state.count - 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
