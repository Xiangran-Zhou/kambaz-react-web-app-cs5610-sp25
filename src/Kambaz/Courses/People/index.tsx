import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PeopleTable from "./Table";
import { findUsersForCourse } from "../../Courses/client";
import { User } from "../../Account/accountReducer";

export default function People() {
  // Use "cid" from the URL to fetch enrolled users for that course.
  const { cid } = useParams<{ cid: string }>();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!cid) return;
    (async () => {
      try {
        const enrolledUsers = await findUsersForCourse(cid);
        setUsers(enrolledUsers);
      } catch (error) {
        console.error("Failed to retrieve enrolled users", error);
      }
    })();
  }, [cid]);

  return (
    <div>
      <h2>People Enrolled in Course {cid}</h2>
      <PeopleTable users={users} />
    </div>
  );
}
