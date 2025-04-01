import { ListGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo, Todo } from "./todosReducer";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();

  return (
    <ListGroup.Item>
      <div className="d-flex align-items-center justify-content-between">
        <span>{todo.title}</span>
        <div>
          <Button
            variant="primary"
            className="me-2"
            onClick={() => dispatch(setTodo(todo))}
            id="wd-set-todo-click"
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => dispatch(deleteTodo(todo.id))}
            id="wd-delete-todo-click"
          >
            Delete
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  );
}
