import { useState } from "react";
import Form from "react-bootstrap/Form";
export default function DateStateVariable() {
  const [startDate, setStartDate] = useState(new Date());

  const dateObjectToHtmlDateString = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div id="wd-date-state-variables">
      <h2>Date State Variables</h2>
      <h3>{JSON.stringify(startDate)}</h3>
      <h3>{dateObjectToHtmlDateString(startDate)}</h3>
      <Form.Group>
        <Form.Control
          type="date"
          value={dateObjectToHtmlDateString(startDate)}
          onChange={(e) => setStartDate(new Date(e.target.value))}
        />
      </Form.Group>
      <hr />
    </div>
  );
}
