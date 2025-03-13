import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";

const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
  },
});

// Export RootState for use in selectors.
export type RootState = ReturnType<typeof store.getState>;

export default store;
