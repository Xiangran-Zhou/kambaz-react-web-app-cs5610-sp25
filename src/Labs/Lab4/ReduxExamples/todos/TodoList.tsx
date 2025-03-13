import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { RootState } from "../../../store";
import { Todo } from "./todosReducer";

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todosReducer.todos);
  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
