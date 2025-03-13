import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";

// Define the Assignment interface
export interface Assignment {
  _id: string;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  course: string;
  editing?: boolean;
}

// Define the state shape
interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: assignments as Assignment[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        points: number;
        dueDate: string;
        availableFrom: string;
        availableUntil: string;
        course: string;
      }>
    ) => {
      const newAssignment: Assignment = {
        _id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description,
        points: action.payload.points,
        dueDate: action.payload.dueDate,
        availableFrom: action.payload.availableFrom,
        availableUntil: action.payload.availableUntil,
        course: action.payload.course,
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== action.payload
      );
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload._id ? action.payload : a
      );
    },
    // Optionally, you can add an editAssignment reducer to set editing flag
    editAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload ? { ...a, editing: true } : a
      );
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
