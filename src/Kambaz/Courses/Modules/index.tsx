import { ListGroup } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
  return (
    <div>
      <ModulesControls />
      <br />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <span>
              <BsGripVertical className="me-2 fs-3" /> Week 1
            </span>
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <span>
                <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES
              </span>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <span>
                <BsGripVertical className="me-2 fs-3" /> Introduction to the
                course
              </span>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <span>
                <BsGripVertical className="me-2 fs-3" /> Learn what is Web
                Development
              </span>
              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>

        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <span>
              <BsGripVertical className="me-2 fs-3" /> Week 2
            </span>
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <span>
                <BsGripVertical className="me-2 fs-3" /> LESSON 1
              </span>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <span>
                <BsGripVertical className="me-2 fs-3" /> LESSON 2
              </span>
              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
