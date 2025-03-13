import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a User interface. Adjust the properties as needed.
export interface User {
  _id: string;
  username: string;
  password: string;
  role: string;
}

interface AccountState {
  currentUser: User | null;
}

const initialState: AccountState = {
  currentUser: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
