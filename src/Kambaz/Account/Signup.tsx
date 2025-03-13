import React, { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as db from "../Database";

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

  const signup = () => {
    // Provide defaults for the missing fields
    const newUser = {
      _id: new Date().getTime().toString(),
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dob: "",
      role: "STUDENT",
      loginId: "",
      section: "",
      lastActivity: new Date().toISOString().split("T")[0],
      totalActivity: "00:00:00",
    };

    db.users.push(newUser);
    dispatch(setCurrentUser(newUser));
    navigate("/Kambaz/Account/Profile");
  };

  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <FormControl
        className="mb-2"
        placeholder="username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <FormControl
        className="mb-2"
        type="password"
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <FormControl
        className="mb-2"
        placeholder="First Name"
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      <FormControl
        className="mb-2"
        placeholder="Last Name"
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
      />
      <FormControl
        className="mb-2"
        placeholder="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <Button className="w-100 mb-2" onClick={signup}>
        Sign up
      </Button>
      <Link to="/Kambaz/Account/Signin">Already have an account?</Link>
    </div>
  );
}
