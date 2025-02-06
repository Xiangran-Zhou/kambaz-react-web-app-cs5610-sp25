import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <Form.Control id="wd-username" defaultValue="alice" className="mb-2" />
      <Form.Control
        id="wd-password"
        defaultValue="123"
        type="password"
        className="mb-2"
      />
      <Form.Control
        id="wd-firstname"
        defaultValue="Alice"
        placeholder="First Name"
        className="mb-2"
      />
      <Form.Control
        id="wd-lastname"
        defaultValue="Wonderland"
        placeholder="Last Name"
        className="mb-2"
      />
      <Form.Control
        id="wd-dob"
        defaultValue="2000-01-01"
        type="date"
        className="mb-2"
      />
      <Form.Control
        id="wd-email"
        defaultValue="alice@wonderland.com"
        type="email"
        className="mb-2"
      />
      <Form.Select id="wd-role" defaultValue="Faculty" className="mb-2">
        <option value="User">User</option>
        <option value="Admin">Admin</option>
        <option value="Faculty">Faculty</option>
        <option value="Student">Student</option>
      </Form.Select>
      <Link
        id="wd-signout-btn"
        to="/Kambaz/Account/Signin"
        className="btn btn-danger w-100 mb-2"
      >
        Sign out
      </Link>
    </div>
  );
}
