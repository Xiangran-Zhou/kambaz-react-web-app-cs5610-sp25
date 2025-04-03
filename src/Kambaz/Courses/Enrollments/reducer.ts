import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
    enrollCourse: (state, action: PayloadAction<Enrollment>) => {
      const { user, course } = action.payload;
      const exists = state.enrollments.some(
        (en) => en.user === user && en.course === course
      );
      if (!exists) {
        state.enrollments.push(action.payload);
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
