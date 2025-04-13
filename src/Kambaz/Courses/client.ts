import axios from "axios";
import { Course } from "./types";
import { Module } from "./Modules/reducer";
import { User } from "../Account/accountReducer";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// 1. Fetch all courses.
export const fetchAllCourses = async (): Promise<Course[]> => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

// 2. Create a new course.
export const createCourse = async (course: Course): Promise<Course> => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data;
};

export interface DeleteResult {
  acknowledged: boolean;
  deletedCount?: number;
}

// 3. Delete a course.
export const deleteCourse = async (id: string): Promise<DeleteResult> => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

export interface UpdateResult {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId?: string;
  upsertedCount?: number;
  matchedCount: number;
}

// 4. Update a course.
export const updateCourse = async (course: Course): Promise<UpdateResult> => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course
  );
  return data;
};

// 5. Retrieve modules for a course.
export const findModulesForCourse = async (
  courseId: string
): Promise<Module[]> => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/modules`
  );
  return data;
};

// 6. Create a new module for a given course.
export const createModuleForCourse = async (
  courseId: string,
  newModule: { name: string }
): Promise<Module> => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    newModule
  );
  return data;
};

// 7. Retrieve the users enrolled in a given course (by courseId).
export const findUsersForCourse = async (courseId: string): Promise<User[]> => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/users`
  );
  return data;
};
