import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Enrollment {
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  // Optionally initialize from your database, e.g.:
  // enrollments: db.enrollments as Enrollment[]
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
    enrollCourse: (
      state,
      action: PayloadAction<{ user: string; course: string }>
    ) => {
      const { user, course } = action.payload;
      const exists = state.enrollments.some(
        (en) => en.user === user && en.course === course
      );
      if (!exists) {
        state.enrollments.push({ user, course });
      }
    },
    unenrollCourse: (
      state,
      action: PayloadAction<{ user: string; course: string }>
    ) => {
      const { user, course } = action.payload;
      state.enrollments = state.enrollments.filter(
        (en) => !(en.user === user && en.course === course)
      );
    },
  },
});

export const { setEnrollments, enrollCourse, unenrollCourse } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
