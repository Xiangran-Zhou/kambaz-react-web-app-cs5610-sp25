import axios from "axios";
import { User } from "./accountReducer";
import { Course } from "../Courses/types";

// Create axios instance with credentials
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

// Define delete response type
export interface DeleteResult {
  acknowledged?: boolean;
  deletedCount?: number;
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

export const findMyCourses = async (): Promise<Course[]> => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

export const findMyEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/enrollments`
  );
  return data;
};

export const createCourse = async (course: Course): Promise<Course> => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

export const enrollCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/enroll`, {
    courseId,
  });
  return data;
};

export const findAllUsers = async () => {
  const { data } = await axios.get(USERS_API);
  return data;
};

export const findUsersByRole = async (role: string) => {
  const response = await axios.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await axios.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const findUserById = async (id: string): Promise<User> => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};

export const deleteUser = async (userId: string): Promise<DeleteResult> => {
  const response = await axios.delete(`${USERS_API}/${userId}`);
  return response.data;
};

export const createUser = async (user: Omit<User, "_id">): Promise<User> => {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
};
