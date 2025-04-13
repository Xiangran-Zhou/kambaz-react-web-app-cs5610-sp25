import { useEffect, useState } from "react";
import { FaUserCircle, FaPencilAlt, FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { FormControl } from "react-bootstrap";
import * as client from "../../Account/client";
import { User } from "../../Account/accountReducer";

export default function PeopleDetails() {
  const { uid } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!uid) return;
    (async () => {
      const fetchedUser = await client.findUserById(uid);
      setUser(fetchedUser);
      if (fetchedUser) {
        setName(`${fetchedUser.firstName} ${fetchedUser.lastName}`);
      }
    })();
  }, [uid]);

  if (!uid || !user) return null;

  const handleDelete = async () => {
    await client.deleteUser(uid);
    navigate(-1);
  };

  const saveUser = async () => {
    const [firstName, ...rest] = name.split(" ");
    const lastName = rest.join(" ") || "";
    const updatedUser = { ...user, firstName, lastName };
    // Update in DB and get the saved user
    const savedUser = await client.updateUser(updatedUser);
    setUser(savedUser);
    setEditing(false);
    // After saving, navigate back.
    // The Users component's useEffect (with [uid] dependency) will re-fetch the updated list.
    setTimeout(() => navigate(-1), 100);
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={() => navigate(-1)}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="text-danger fs-4">
        {!editing && (
          <>
            <div className="wd-name" onClick={() => setEditing(true)}>
              {user.firstName} {user.lastName}
            </div>
            <FaPencilAlt
              onClick={() => setEditing(true)}
              className="float-end fs-5 mt-2 wd-edit"
            />
          </>
        )}
        {editing && (
          <>
            <FormControl
              className="w-50 wd-edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveUser();
              }}
            />
            <FaCheck
              onClick={() => saveUser()}
              className="float-end fs-5 mt-2 me-2 wd-save"
            />
          </>
        )}
      </div>
      <div>
        <b>Roles:</b> <span className="wd-roles">{user.role}</span>
        <br />
        <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span>
        <br />
        <b>Section:</b> <span className="wd-section">{user.section}</span>
        <br />
        <b>Total Activity:</b>{" "}
        <span className="wd-total-activity">{user.totalActivity}</span>
      </div>
      <hr />
      <button
        onClick={handleDelete}
        className="btn btn-danger float-end wd-delete"
      >
        Delete
      </button>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary float-start float-end me-2 wd-cancel"
      >
        Cancel
      </button>
    </div>
  );
}
