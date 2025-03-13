import { useState } from "react";
import Form from "react-bootstrap/Form";
export default function StringStateVariables() {
  const [firstName, setFirstName] = useState("John");

  return (
    <div>
      <h2>String State Variables</h2>
      <p>{firstName}</p>
      <Form.Group>
        <Form.Control
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Group>
      <hr />
    </div>
  );
}
