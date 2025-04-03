import axios from "axios";
import { Module } from "./reducer";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

export const deleteModule = async (moduleId: string): Promise<void> => {
  const { data } = await axios.delete(`${MODULES_API}/${moduleId}`);
  return data;
};

export const updateModule = async (module: Module): Promise<Module> => {
  const { data } = await axios.put(`${MODULES_API}/${module._id}`, module);
  return data;
};
