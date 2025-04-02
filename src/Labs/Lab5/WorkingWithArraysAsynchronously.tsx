import { useState, useEffect, KeyboardEvent } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";
import * as client from "./client";
import axios from "axios";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  editing?: boolean;
}

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      const fetchedTodos: Todo[] = await client.fetchTodos();
      setTodos(fetchedTodos);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "Failed to fetch todos");
      } else {
        setErrorMessage("Failed to fetch todos");
      }
    }
  };

  const removeTodo = async (todo: Todo) => {
    try {
      const updatedTodos: Todo[] = await client.removeTodo(todo);
      setTodos(updatedTodos);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "Failed to remove todo");
      } else {
        setErrorMessage("Failed to remove todo");
      }
    }
  };

  const deleteTodo = async (todo: Todo) => {
    try {
      await client.deleteTodo(todo);
      const newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "Failed to delete todo");
      } else {
        setErrorMessage("Failed to delete todo");
      }
    }
  };

  const createTodo = async () => {
    try {
      const updatedTodos: Todo[] = await client.createTodo();
      setTodos(updatedTodos);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "Failed to create todo");
      } else {
        setErrorMessage("Failed to create todo");
      }
    }
  };

  const postTodo = async () => {
    try {
      const newTodo: Todo = await client.postTodo({
        title: "New Posted Todo",
        completed: false,
        description: "New posted description",
      });
      setTodos([...todos, newTodo]);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "Failed to post todo");
      } else {
        setErrorMessage("Failed to post todo");
      }
    }
  };

  const editTodo = (todo: Todo) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...todo, editing: true } : t
    );
    setTodos(updatedTodos);
  };

  const updateTodo = async (updatedTodo: Todo) => {
    try {
      await client.updateTodo(updatedTodo);
      const newTodos = todos.map((t) =>
        t.id === updatedTodo.id ? updatedTodo : t
      );
      setTodos(newTodos);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "Failed to update todo");
      } else {
        setErrorMessage("Failed to update todo");
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, todo: Todo) => {
    if (e.key === "Enter") {
      updateTodo({ ...todo, editing: false });
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      {errorMessage && (
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mb-2 mt-2"
        >
          {errorMessage}
        </div>
      )}
      <h4>
        Todos
        <FaPlusCircle
          onClick={createTodo}
          className="text-success float-end fs-3"
          id="wd-create-todo"
        />
        <FaPlusCircle
          onClick={postTodo}
          className="text-primary float-end fs-3 me-3"
          id="wd-post-todo"
        />
      </h4>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroup.Item key={todo.id}>
            <FaPencil
              onClick={() => editTodo(todo)}
              className="text-primary float-end me-2 mt-1"
            />
            <TiDelete
              onClick={() => deleteTodo(todo)}
              className="text-danger float-end me-2 fs-3"
              id="wd-delete-todo"
            />
            <FaTrash
              onClick={() => removeTodo(todo)}
              className="text-danger float-end mt-1"
              id="wd-remove-todo"
            />
            <input
              type="checkbox"
              className="form-check-input me-2 float-start"
              defaultChecked={todo.completed}
              onChange={(e) =>
                updateTodo({ ...todo, completed: e.target.checked })
              }
            />
            {!todo.editing ? (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            ) : (
              <input
                type="text"
                className="form-control w-50 float-start"
                defaultValue={todo.title}
                onKeyDown={(e) => handleKeyDown(e, todo)}
                onChange={(e) => updateTodo({ ...todo, title: e.target.value })}
              />
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
