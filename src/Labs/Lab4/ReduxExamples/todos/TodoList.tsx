import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { RootState } from "../../../store";
import { Todo } from "./todosReducer";

export default function TodoList() {
  const todos: Todo[] = useSelector(
    (state: RootState) => state.todosReducer.todos
  );

  return (
    <div id="wd-todo-list-redux">
      <h2 className="mb-3">Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>
    </div>
  );
}
