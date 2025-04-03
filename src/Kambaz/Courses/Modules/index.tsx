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
  Module,
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

  // State for new module name.
  const [moduleName, setModuleName] = useState("");

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const modulesFromServer = await coursesClient.findModulesForCourse(
          cid as string
        );
        dispatch(setModules(modulesFromServer));
      } catch (error) {
        console.error(error);
      }
    };

    fetchModules();
  }, [cid, dispatch]);

  // Create a new module for the current course.
  const createModuleForCourse = async () => {
    if (!cid || !moduleName) return;
    const newModuleData = { name: moduleName };
    try {
      const newModule = await coursesClient.createModuleForCourse(
        cid,
        newModuleData
      );
      dispatch(addModule(newModule));
      setModuleName("");
    } catch (error) {
      console.error(error);
    }
  };

  // NEW: Save module updates.
  const saveModule = async (module: Module) => {
    try {
      const updatedModule = await modulesClient.updateModule({
        ...module,
        editing: false,
      });
      dispatch(updateModule(updatedModule));
    } catch (error) {
      console.error(error);
    }
  };

  // Remove module handler.
  const removeModule = async (moduleId: string) => {
    try {
      await modulesClient.deleteModule(moduleId);
      dispatch(deleteModule(moduleId));
    } catch (error) {
      console.error(error);
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
      <br />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules
          .filter((module: Module) => module.course === cid)
          .map((module: Module) => (
            <ListGroup.Item
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              {/* Module Title */}
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
                <BsGripVertical className="me-2 fs-3" />
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
