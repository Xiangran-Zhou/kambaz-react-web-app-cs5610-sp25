import { BsPlus, BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import {
  Button,
  InputGroup,
  FormControl,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import LessonControlButtons from "../Modules/LessonControlButtons";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="p-3">
      {/* Search Bar and Buttons */}
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
          <Button variant="danger">
            <BsPlus className="me-1" /> Assignment
          </Button>
        </Col>
      </Row>

      {/* Assignments Header */}
      <ListGroup className="rounded-0">
        <ListGroup.Item className="p-3 ps-2 bg-light d-flex align-items-center justify-content-between">
          <span className="fw-bold fs-5">ASSIGNMENTS</span>
          <span className="text-muted fw-bold">40% of Total</span>
          <Button variant="light" className="border">
            <BsPlus />
          </Button>
        </ListGroup.Item>

        {/* Assignment List */}
        {[
          { id: "123", title: "A1 - ENV + HTML", date: "May 6", due: "May 13" },
          {
            id: "124",
            title: "A2 - CSS + BOOTSTRAP",
            date: "May 13",
            due: "May 20",
          },
          {
            id: "125",
            title: "A3 - JAVASCRIPT + REACT",
            date: "May 20",
            due: "May 27",
          },
        ].map((assignment) => (
          <ListGroup.Item
            key={assignment.id}
            className="wd-lesson p-3 d-flex align-items-center justify-content-between"
          >
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-3 fs-5 text-muted" />
              <MdAssignment className="fs-4 text-muted me-3" />
              <div>
                <a
                  href={`#/Kambaz/Courses/1234/Assignments/${assignment.id}`}
                  className="fw-bold text-dark text-decoration-none"
                >
                  {assignment.title}
                </a>
                <div className="small">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <strong>Not available until</strong> {assignment.date} at
                  12:00am | <strong>Due</strong> {assignment.due} at 11:59pm |
                  100 pts
                </div>
              </div>
            </div>
            <LessonControlButtons />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
