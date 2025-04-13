// src/Kambaz/Assignments/index.tsx
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Button,
  InputGroup,
  FormControl,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import { BsPlus, BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  setAssignments,
  deleteAssignment as deleteAssignmentAction,
} from "./reducer";
import { Assignment } from "./reducer";
import * as assignmentsClient from "./client";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const assignments = useSelector(
    (state: RootState) => state.assignmentsReducer.assignments
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverAssignments = await assignmentsClient.findAllAssignments(
          cid
        );
        dispatch(setAssignments(serverAssignments));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [cid, dispatch]);

  const onDelete = async (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignmentAction(assignmentId));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div id="wd-assignments" className="p-3">
      <Row className="align-items-center mb-3">
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <FormControl placeholder="Search for Assignments" />
          </InputGroup>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2">
            <BsPlus className="me-1" /> Group
          </Button>
          <Button
            variant="danger"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/new`)}
          >
            <BsPlus className="me-1" /> Assignment
          </Button>
        </Col>
      </Row>

      <ListGroup className="rounded-0">
        <ListGroup.Item className="p-3 ps-2 bg-light d-flex align-items-center justify-content-between">
          <span className="fw-bold fs-5">ASSIGNMENTS</span>
          <span className="text-muted fw-bold">40% of Total</span>
          <Button variant="light" className="border">
            <BsPlus />
          </Button>
        </ListGroup.Item>

        {assignments
          .filter((assignment: Assignment) => assignment.course === cid)
          .map((assignment: Assignment) => (
            <ListGroup.Item
              key={assignment._id}
              className="wd-lesson p-3 d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-3 fs-5 text-muted" />
                <MdAssignment className="fs-4 text-muted me-3" />
                <div>
                  <Link
                    to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                    className="fw-bold text-dark text-decoration-none"
                  >
                    {assignment.title}
                  </Link>
                  <div className="small">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Not available until</strong>{" "}
                    {assignment.availableFrom} | <strong>Due</strong>{" "}
                    {assignment.dueDate} | {assignment.points} pts
                  </div>
                </div>
              </div>
              <div>
                <Button
                  variant="outline-danger"
                  onClick={() => onDelete(assignment._id)}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}
