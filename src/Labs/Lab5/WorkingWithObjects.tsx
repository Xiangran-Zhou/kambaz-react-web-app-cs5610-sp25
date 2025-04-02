import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [moduleObj, setModuleObj] = useState({
    id: "mod001",
    name: "Introduction to NodeJS",
    description: "A module on NodeJS fundamentals",
    course: "Web Development",
  });

  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <h4>Retrieving Assignment</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary mb-2"
        href={`${ASSIGNMENT_API_URL}`}
      >
        Get Assignment
      </a>
      <hr />

      <h4>Retrieving Assignment Title</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary mb-2"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Title
      </a>
      <hr />

      <h4>Modifying Assignment Title</h4>
      <FormControl
        className="w-75 mb-2"
        id="wd-assignment-title"
        type="text"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary mb-2"
        href={`${ASSIGNMENT_API_URL}/title/${encodeURIComponent(
          assignment.title
        )}`}
      >
        Update Title
      </a>
      <hr />

      <h4>Modifying Assignment Score</h4>
      <FormControl
        className="w-75 mb-2"
        id="wd-assignment-score"
        type="number"
        defaultValue={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })
        }
      />
      <a
        id="wd-update-assignment-score"
        className="btn btn-primary mb-2"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <hr />

      <h4>Modifying Assignment Completed</h4>
      <FormControl
        className="w-75 mb-2"
        id="wd-assignment-completed"
        type="checkbox"
        defaultChecked={assignment.completed}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAssignment({ ...assignment, completed: e.target.checked })
        }
      />
      <a
        id="wd-update-assignment-completed"
        className="btn btn-primary mb-2"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>
      <hr />

      {/* Module Section */}
      <h4>Retrieving Module</h4>
      <a
        id="wd-retrieve-module"
        className="btn btn-primary mb-2"
        href={`${MODULE_API_URL}`}
      >
        Get Module
      </a>
      <hr />

      <h4>Retrieving Module Name</h4>
      <a
        id="wd-retrieve-module-name"
        className="btn btn-primary mb-2"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>
      <hr />

      <h4>Modifying Module Name</h4>
      <FormControl
        className="w-75 mb-2"
        id="wd-module-name"
        type="text"
        defaultValue={moduleObj.name}
        onChange={(e) => setModuleObj({ ...moduleObj, name: e.target.value })}
      />
      <a
        id="wd-update-module-name"
        className="btn btn-primary mb-2"
        href={`${MODULE_API_URL}/name/${encodeURIComponent(moduleObj.name)}`}
      >
        Update Module Name
      </a>
      <hr />

      <h4>Modifying Module Description</h4>
      <FormControl
        className="w-75 mb-2"
        id="wd-module-description"
        type="text"
        defaultValue={moduleObj.description}
        onChange={(e) =>
          setModuleObj({ ...moduleObj, description: e.target.value })
        }
      />
      <a
        id="wd-update-module-description"
        className="btn btn-primary mb-2"
        href={`${MODULE_API_URL}/description/${encodeURIComponent(
          moduleObj.description
        )}`}
      >
        Update Module Description
      </a>
      <hr />
    </div>
  );
}
