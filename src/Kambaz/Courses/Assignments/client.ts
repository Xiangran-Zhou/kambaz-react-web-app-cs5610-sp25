// src/Kambaz/Assignments/client.ts
import axios from "axios";
import { Assignment } from "./reducer";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

/**
 * Fetch all assignments.
 * If a courseId is provided, the endpoint filters assignments by course.
 */
export const findAllAssignments = async (
  courseId?: string
): Promise<Assignment[]> => {
  let url = ASSIGNMENTS_API;
  if (courseId) {
    url += `?course=${courseId}`;
  }
  const { data } = await axios.get(url);
  return data;
};

/**
 * Create a new assignment.
 * The assignment parameter should include at least the title, course, description, etc.
 */
export const createAssignment = async (
  assignment: Partial<Assignment>
): Promise<Assignment> => {
  const { data } = await axios.post(ASSIGNMENTS_API, assignment);
  return data;
};

/**
 * Update an existing assignment.
 * The entire assignment object including its _id should be provided.
 */
export const updateAssignment = async (
  assignment: Assignment
): Promise<Assignment> => {
  const { data } = await axios.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return data;
};

/**
 * Delete an assignment by its unique ID.
 */
export const deleteAssignment = async (assignmentId: string): Promise<void> => {
  await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
};
