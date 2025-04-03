import axios from "axios";
import { User } from "./accountReducer";
import { Course } from "../Courses/types";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER as string;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export interface Credentials {
  username: string;
  password: string;
}

export interface SignupUser extends Credentials {
  firstName: string;
  lastName: string;
  email: string;
}

export const signin = async (
  credentials: Credentials
): Promise<User | null> => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};

export const signup = async (user: SignupUser): Promise<User> => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const updateUser = async (user: User): Promise<User> => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data;
};

export const profile = async (): Promise<User | null> => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const signout = async (): Promise<void> => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

// Retrieve courses for the current (logged-in) user.
export const findMyCourses = async (): Promise<Course[]> => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

// NEW: Create a new course and enroll the current user in it.
export const createCourse = async (course: Course): Promise<Course> => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};
