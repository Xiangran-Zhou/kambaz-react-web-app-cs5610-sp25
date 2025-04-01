import { ListGroup, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo, Todo } from "./todosReducer";
import { RootState } from "../../../store";

export default function TodoForm() {
  const todo: Todo = useSelector((state: RootState) => state.todosReducer.todo);
  const dispatch = useDispatch();

  return (
    <ListGroup.Item>
      <div className="d-flex align-items-center justify-content-between">
        <FormControl
          className="me-2"
          style={{ maxWidth: "300px" }}
          value={todo.title}
          onChange={(e) =>
            dispatch(setTodo({ ...todo, title: e.target.value }))
          }
        />
        <div>
          <Button
            variant="success"
            onClick={() => dispatch(addTodo(todo))}
            id="wd-add-todo-click"
            className="me-2"
          >
            Add
          </Button>
          <Button
            variant="warning"
            onClick={() => dispatch(updateTodo(todo))}
            id="wd-update-todo-click"
          >
            Update
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  );
}
