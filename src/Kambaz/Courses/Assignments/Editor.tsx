import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  addAssignment as addAssignmentAction,
  updateAssignment as updateAssignmentAction,
} from "./reducer";
import { Assignment } from "./reducer";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignments = useSelector(
    (state: RootState) => state.assignmentsReducer.assignments
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const isFaculty = currentUser?.role === "FACULTY";

  const existingAssignment = assignments.find((a) => a._id === aid);

  // Local form state
  const [title, setTitle] = useState(
    existingAssignment ? existingAssignment.title : ""
  );
  const [description, setDescription] = useState(
    existingAssignment ? existingAssignment.description : ""
  );
  const [points, setPoints] = useState(
    existingAssignment ? existingAssignment.points : 100
  );
  const [dueDate, setDueDate] = useState(
    existingAssignment ? existingAssignment.dueDate : ""
  );
  const [availableFrom, setAvailableFrom] = useState(
    existingAssignment ? existingAssignment.availableFrom : ""
  );
  const [availableUntil, setAvailableUntil] = useState(
    existingAssignment ? existingAssignment.availableUntil : ""
  );

  const isEditing = Boolean(existingAssignment);

  const onSave = async () => {
    if (!isFaculty) {
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
      return;
    }
    if (isEditing && existingAssignment) {
      const updated: Assignment = {
        ...existingAssignment,
        title,
        description,
        points,
        dueDate,
        availableFrom,
        availableUntil,
      };
      const serverAssignment = await assignmentsClient.updateAssignment(
        updated
      );
      dispatch(updateAssignmentAction(serverAssignment));
    } else {
      const newAssignmentData = {
        title,
        description,
        points,
        dueDate,
        availableFrom,
        availableUntil,
        course: cid!,
      };
      const created = await assignmentsClient.createAssignment(
        newAssignmentData
      );
      dispatch(addAssignmentAction(created));
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const onCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Assignment Name</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!isFaculty}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={!isFaculty}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Points</Form.Label>
        <Form.Control
          type="number"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
          disabled={!isFaculty}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Due Date</Form.Label>
        <Form.Control
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={!isFaculty}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Available From</Form.Label>
        <Form.Control
          type="date"
          value={availableFrom}
          onChange={(e) => setAvailableFrom(e.target.value)}
          disabled={!isFaculty}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Available Until</Form.Label>
        <Form.Control
          type="date"
          value={availableUntil}
          onChange={(e) => setAvailableUntil(e.target.value)}
          disabled={!isFaculty}
        />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button variant="secondary" onClick={onCancel}>
          {isFaculty ? "Cancel" : "Back"}
        </Button>
        {isFaculty && (
          <Button variant="danger" onClick={onSave}>
            Save
          </Button>
        )}
      </div>
    </div>
  );
}
