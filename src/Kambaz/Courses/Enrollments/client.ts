import axios from "axios";
import { Enrollment } from "./reducer";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER as string;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const findAllEnrollments = async (): Promise<Enrollment[]> => {
  const { data } = await axios.get(ENROLLMENTS_API);
  return data;
};

export const enrollInCourse = async (
  user: string,
  course: string
): Promise<Enrollment> => {
  const { data } = await axios.post(ENROLLMENTS_API, { user, course });
  return data;
};

export const unenrollFromCourse = async (
  user: string,
  course: string
): Promise<void> => {
  await axios.delete(ENROLLMENTS_API, { data: { user, course } });
};
