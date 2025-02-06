import { Form, Button, Row, Col, Dropdown } from "react-bootstrap";
import { useState } from "react";

export default function AssignmentEditor() {
  const [assignTo, setAssignTo] = useState("Everyone");

  return (
    <div id="wd-assignments-editor" className="p-4">
      {/* Assignment Name */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Assignment Name</Form.Label>
        <Form.Control type="text" defaultValue="A1 - ENV + HTML" />
      </Form.Group>

      {/* Assignment Description */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          defaultValue="The assignment is available online. Submit a link to the landing page of your Web application."
        />
      </Form.Group>

      {/* Points */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Points</Form.Label>
        <Form.Control type="number" defaultValue="100" />
      </Form.Group>

      {/* Assignment Group */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Assignment Group</Form.Label>
        <Form.Select defaultValue="Assignments">
          <option value="Assignments">Assignments</option>
          <option value="Quizzes">Quizzes</option>
          <option value="Projects">Projects</option>
        </Form.Select>
      </Form.Group>

      {/* Display Grade As */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Display Grade as</Form.Label>
        <Form.Select defaultValue="Points">
          <option value="Points">Points</option>
          <option value="Percentage">Percentage</option>
          <option value="Letter Grade">Letter Grade</option>
        </Form.Select>
      </Form.Group>

      {/* Submission Type */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Submission Type</Form.Label>
        <Form.Select defaultValue="Online">
          <option value="Online">Online</option>
          <option value="On Paper">On Paper</option>
          <option value="No Submission">No Submission</option>
        </Form.Select>
      </Form.Group>

      {/* Assign To */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Assign To</Form.Label>
        <Dropdown>
          <Dropdown.Toggle variant="light" className="w-100 text-start border">
            {assignTo}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setAssignTo("Everyone")}>
              Everyone
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setAssignTo("Group 1")}>
              Group 1
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setAssignTo("Group 2")}>
              Group 2
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>

      {/* Due Date */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Due Date</Form.Label>
        <Form.Control type="date" defaultValue="2024-05-13" />
      </Form.Group>

      {/* Available From / Until */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Available From / Until</Form.Label>
        <Row>
          <Col>
            <Form.Control type="date" defaultValue="2024-05-06" />
          </Col>
          <Col className="text-center align-self-center">to</Col>
          <Col>
            <Form.Control type="date" defaultValue="2024-05-20" />
          </Col>
        </Row>
      </Form.Group>

      {/* Buttons */}
      <div className="d-flex gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button variant="danger">Save</Button>
      </div>
    </div>
  );
}
