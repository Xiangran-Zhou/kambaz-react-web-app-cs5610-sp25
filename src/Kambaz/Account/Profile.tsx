import { useState, useEffect } from "react";
import { FormControl, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setCurrentUser, User } from "./accountReducer";
import { useNavigate } from "react-router-dom";
import * as client from "./client";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );

  // Local state for profile editing
  const [profile, setProfile] = useState<User | null>(currentUser);

  useEffect(() => {
    if (!currentUser) {
      navigate("/Kambaz/Account/Signin");
    } else {
      setProfile(currentUser);
    }
  }, [currentUser, navigate]);

  const updateProfile = async () => {
    if (!profile) return;
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };

  if (!profile) return null;

  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <FormControl
        id="wd-username"
        defaultValue={profile.username}
        className="mb-2"
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
      />
      <FormControl
        id="wd-password"
        defaultValue={profile.password}
        type="password"
        className="mb-2"
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
      />
      <FormControl
        id="wd-firstname"
        defaultValue={profile.firstName}
        placeholder="First Name"
        className="mb-2"
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
      />
      <FormControl
        id="wd-lastname"
        defaultValue={profile.lastName}
        placeholder="Last Name"
        className="mb-2"
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
      />
      <FormControl
        id="wd-dob"
        defaultValue={profile.dob}
        type="date"
        className="mb-2"
        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
      />
      <FormControl
        id="wd-email"
        defaultValue={profile.email}
        type="email"
        className="mb-2"
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
      />
      <select
        id="wd-role"
        className="form-control mb-2"
        value={profile.role}
        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <Button variant="primary" className="w-100 mb-2" onClick={updateProfile}>
        Update
      </Button>
      <Button variant="danger" className="w-100 mb-2" onClick={signout}>
        Sign out
      </Button>
    </div>
  );
}
