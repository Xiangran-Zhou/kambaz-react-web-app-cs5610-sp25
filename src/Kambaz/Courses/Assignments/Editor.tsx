export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        {/* Complete on your own */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option value="assignments">Assignments</option>
              <option value="quizzes">Quizzes</option>
              <option value="projects">Projects</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade">
              <option value="points">Points</option>
              <option value="percentage">Percentage</option>
              <option value="letter-grade">Letter Grade</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="online">Online</option>
              <option value="on-paper">On Paper</option>
              <option value="no-submission">No Submission</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label>Assign To</label>
          </td>
          <td>
            <input id="wd-assign-to" placeholder="Everyone" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-due-date">Due Date</label>
          </td>
          <td>
            <input id="wd-due-date" type="date" value="2024-05-13" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-dates">Available From/Until</label>
          </td>
          <td>
            <input id="wd-available-from" type="date" value="2024-05-06" />
            <span> to </span>
            <input id="wd-available-until" type="date" value="2024-05-20" />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button>Cancel</button>
            <button>Save</button>
          </td>
        </tr>
      </table>
    </div>
  );
}
