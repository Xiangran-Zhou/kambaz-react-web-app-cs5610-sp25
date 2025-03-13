import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/accountReducer.ts";
import assignmentsReducer from "./Courses/Assignments/reducer";
import coursesReducer from "./Courses/reducer";
import enrollmentsReducer from "./Courses/Enrollments/reducer";

const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    coursesReducer,
    enrollmentsReducer,
  },
});

// Export RootState for use in selectors.
export type RootState = ReturnType<typeof store.getState>;

export default store;
