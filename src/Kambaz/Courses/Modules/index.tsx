import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { ListGroup, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  setModules,
  addModule,
  deleteModule,
  updateModule,
  editModule,
  Module as ModuleType,
} from "./reducer";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const modules = useSelector(
    (state: RootState) => state.modulesReducer.modules
  );
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );

  // Keep track of the new module name.
  const [moduleName, setModuleName] = useState("");

  useEffect(() => {
    const fetchModules = async () => {
      try {
        // Retrieve modules for the current course from the server.
        const modulesFromServer = await coursesClient.findModulesForCourse(
          cid as string
        );
        dispatch(setModules(modulesFromServer));
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchModules();
  }, [cid, dispatch]);

  // Create a new module for the current course in the database,
  // then update the Redux store to display it.
  const createModuleForCourse = async () => {
    if (!cid || !moduleName) return;
    try {
      const newModuleData = { name: moduleName };
      const newModule = await coursesClient.createModuleForCourse(
        cid,
        newModuleData
      );
      dispatch(addModule(newModule));
      setModuleName("");
    } catch (error) {
      console.error("Error creating module:", error);
    }
  };

  // Save any edits to a module (e.g., renamed title).
  const saveModule = async (module: ModuleType) => {
    try {
      const updatedModule = await modulesClient.updateModule({
        ...module,
        editing: false,
      });
      dispatch(updateModule(updatedModule));
    } catch (error) {
      console.error("Error updating module:", error);
    }
  };

  // Remove a module from the database and update the Redux store.
  const removeModule = async (moduleId: string) => {
    try {
      await modulesClient.deleteModule(moduleId);
      dispatch(deleteModule(moduleId));
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  return (
    <div className="wd-modules">
      {/* Only FACULTY users can add a new module */}
      {currentUser?.role === "FACULTY" && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={createModuleForCourse}
        />
      )}
      {/* Spacing to match the old UI style */}
      <br />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules
          .filter((module: ModuleType) => module.course === cid)
          .map((module: ModuleType) => (
            <ListGroup.Item
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              {/* Module Title */}
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
                {/* Drag icon */}
                <BsGripVertical className="me-2 fs-3" />
                {/* Module name or an inline FormControl for editing */}
                {!module.editing && <span>{module.name}</span>}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    value={module.name}
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveModule({ ...module, editing: false });
                      }
                    }}
                  />
                )}
                {/* FACULTY controls to edit/delete a module */}
                {currentUser?.role === "FACULTY" && (
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={(moduleId: string) => removeModule(moduleId)}
                    editModule={(moduleId: string) =>
                      dispatch(editModule(moduleId))
                    }
                  />
                )}
              </div>

              {/* List of lessons (if any) nested within the module */}
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson) => (
                    <ListGroup.Item
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between"
                    >
                      <span>
                        <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                      </span>
                      <LessonControlButtons />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}
