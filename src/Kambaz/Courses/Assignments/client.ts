import axios from "axios";
import { Assignment } from "./reducer";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

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

export const createAssignment = async (
  assignment: Partial<Assignment>
): Promise<Assignment> => {
  const { data } = await axios.post(ASSIGNMENTS_API, assignment);
  return data;
};

export const updateAssignment = async (
  assignment: Assignment
): Promise<Assignment> => {
  const { data } = await axios.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return data;
};

export const deleteAssignment = async (assignmentId: string): Promise<void> => {
  await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
};
