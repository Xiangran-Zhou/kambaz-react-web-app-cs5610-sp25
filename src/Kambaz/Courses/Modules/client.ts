import axios from "axios";
import { Module } from "./reducer";

// Define the result type for module deletion.
export interface DeleteModuleResult {
  acknowledged: boolean;
  deletedCount?: number;
}

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

export const deleteModule = async (
  moduleId: string
): Promise<DeleteModuleResult> => {
  const { data } = await axiosWithCredentials.delete(
    `${MODULES_API}/${moduleId}`
  );
  return data;
};

export const updateModule = async (module: Module): Promise<Module> => {
  const { data } = await axiosWithCredentials.put(
    `${MODULES_API}/${module._id}`,
    module
  );
  return data;
};
