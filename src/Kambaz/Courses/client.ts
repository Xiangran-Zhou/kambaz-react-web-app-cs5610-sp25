import axios from "axios";
import { Course } from "../Courses/types";
import { Module } from "../Courses/Modules/reducer";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchAllCourses = async (): Promise<Course[]> => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const deleteCourse = async (id: string): Promise<void> => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: Course): Promise<Course> => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (
  courseId: string
): Promise<Module[]> => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModuleForCourse = async (
  courseId: string,
  newModule: { name: string }
): Promise<Module> => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    newModule
  );
  return response.data;
};
