import { useState, useEffect } from "react";
import UsersTable from "../Courses/People/Table";
import * as client from "./client";
import { User } from "./accountReducer";
import { FormControl } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PeopleDetails from "../Courses/People/Details";
import { FaPlus } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { uid } = useParams();

  const fetchUsers = async () => {
    const fetchedUsers = await client.findAllUsers();
    setUsers(fetchedUsers);
  };

  // Re-fetch users when "uid" changes (i.e. when the PeopleDetails component closes)
  useEffect(() => {
    fetchUsers();
  }, [uid]);

  const filterUsersByRole = async (selectedRole: string) => {
    setRole(selectedRole);
    if (selectedRole) {
      const usersFiltered = await client.findUsersByRole(selectedRole);
      setUsers(usersFiltered);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (partialName: string) => {
    setName(partialName);
    if (partialName) {
      const usersFiltered = await client.findUsersByPartialName(partialName);
      setUsers(usersFiltered);
    } else {
      fetchUsers();
    }
  };

  const createUser = async () => {
    const newUser = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
      // Provide default values for extra required fields:
      dob: "",
      loginId: "",
      lastActivity: "",
      totalActivity: "",
    });
    setUsers([...users, newUser]);
  };

  return (
    <div>
      <button
        onClick={createUser}
        className="float-end btn btn-danger wd-add-people"
      >
        <FaPlus className="me-2" />
        Users
      </button>
      <h3>Users</h3>
      <FormControl
        value={name} // Now the "name" state is used as the controlled value.
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name my-4"
      />
      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role my-4"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>
      <UsersTable users={users} />
      {uid && <PeopleDetails />}
    </div>
  );
}
