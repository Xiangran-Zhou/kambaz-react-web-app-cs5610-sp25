import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const API = `${REMOTE_SERVER}/lab5/todos`;

export default function WorkingWithArrays() {
  const [todo, setTodo] = useState({
    id: "1",
    title: "Task 1",
    description: "Description for Task 1",
    completed: false,
  });

  return (
    <div id="wd-working-with-arrays">
      <h2>Working with Arrays</h2>

      <h3>Retrieving Arrays</h3>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />

      <h3>Retrieving an Item from an Array by ID</h3>
      <FormControl
        id="wd-todo-id"
        className="w-50 mb-2"
        defaultValue={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end mb-2"
        href={`${API}/${todo.id}`}
      >
        Get Todo by ID
      </a>
      <div style={{ clear: "both" }} />
      <hr />

      <h3>Filtering Array Items</h3>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />

      <h3>Creating New Items in an Array</h3>
      <a id="wd-create-todo" className="btn btn-primary" href={`${API}/create`}>
        Create Todo
      </a>
      <hr />

      <h3>Deleting from an Array</h3>
      <FormControl
        id="wd-delete-todo-id"
        className="w-50 mb-2"
        defaultValue={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <a
        id="wd-delete-todo"
        className="btn btn-primary float-end mb-2"
        href={`${API}/${todo.id}/delete`}
      >
        Delete Todo with ID = {todo.id}
      </a>
      <div style={{ clear: "both" }} />
      <hr />

      <h3>Updating an Item in an Array</h3>
      <FormControl
        id="wd-update-todo-id"
        className="w-25 float-start me-2 mb-2"
        defaultValue={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <FormControl
        id="wd-update-todo-title"
        className="w-50 float-start mb-2"
        defaultValue={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <a
        id="wd-update-todo"
        className="btn btn-primary float-end mb-2"
        href={`${API}/${todo.id}/title/${encodeURIComponent(todo.title)}`}
      >
        Update Todo Title
      </a>
      <div style={{ clear: "both" }} />
      <hr />

      <h3>Updating Todo Description</h3>
      <FormControl
        id="wd-update-todo-description"
        className="w-50 mb-2"
        type="text"
        defaultValue={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <a
        id="wd-update-todo-description-link"
        className="btn btn-primary mb-2"
        href={`${API}/${todo.id}/description/${encodeURIComponent(
          todo.description
        )}`}
      >
        Describe Todo ID = {todo.id}
      </a>
      <hr />

      <h3>Updating Todo Completed</h3>
      <FormControl
        id="wd-update-todo-completed"
        className="w-50 mb-2"
        type="checkbox"
        defaultChecked={todo.completed}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTodo({ ...todo, completed: e.target.checked })
        }
      />
      <a
        id="wd-update-todo-completed-link"
        className="btn btn-primary mb-2"
        href={`${API}/${todo.id}/completed/${todo.completed}`}
      >
        Complete Todo ID = {todo.id}
      </a>
      <hr />
    </div>
  );
}
