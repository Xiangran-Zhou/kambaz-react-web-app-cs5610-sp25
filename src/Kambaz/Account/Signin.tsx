import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser, User } from "./accountReducer.ts";
import { useDispatch } from "react-redux";
import { FormControl, Button } from "react-bootstrap";
import * as db from "../Database";

interface Credentials {
  username: string;
  password: string;
}

export default function Signin() {
  // Initialize credentials with empty strings.
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = () => {
    // Assume db.users is an array of User objects.
    const user: User | undefined = db.users.find(
      (u: User) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kambaz/Dashboard");
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        className="mb-2"
        placeholder="username"
        id="wd-username"
      />
      <FormControl
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        className="mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      <Button onClick={signin} id="wd-signin-btn" className="w-100">
        Sign in
      </Button>
      <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}
