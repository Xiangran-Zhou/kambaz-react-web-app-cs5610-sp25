import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./accountReducer";
import * as client from "./client";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Basic fields for demonstration
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const signup = async () => {
    // Post the new user to the RESTful API
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    navigate("/Kambaz/Account/Profile");
  };

  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <FormControl
        className="mb-2"
        placeholder="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <FormControl
        className="mb-2"
        type="password"
        placeholder="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <FormControl
        className="mb-2"
        placeholder="First Name"
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      <FormControl
        className="mb-2"
        placeholder="Last Name"
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
      />
      <FormControl
        className="mb-2"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <Button className="w-100 mb-2" onClick={signup}>
        Sign up
      </Button>
      <Link to="/Kambaz/Account/Signin">Already have an account?</Link>
    </div>
  );
}
