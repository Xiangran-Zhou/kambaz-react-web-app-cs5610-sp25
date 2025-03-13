import React, { useState } from "react";

export default function EventObject() {
  const [event, setEvent] = useState<Record<string, unknown> | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Event captured:", e);

    const eventDetails = {
      type: e.type,
      timeStamp: e.timeStamp,
      target: (e.target as HTMLElement).outerHTML,
      screenX: e.screenX,
      screenY: e.screenY,
      clientX: e.clientX,
      clientY: e.clientY,
    };

    setEvent(eventDetails);
  };

  return (
    <div>
      <h2>Event Object</h2>
      <button
        onClick={handleClick}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>
        {event
          ? JSON.stringify(event, null, 2)
          : "Click the button to see event details"}
      </pre>
      <hr />
    </div>
  );
}
