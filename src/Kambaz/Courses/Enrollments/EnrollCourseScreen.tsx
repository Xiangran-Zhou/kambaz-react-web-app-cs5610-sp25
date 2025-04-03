import { useEffect, useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { Course } from "../types";
import * as courseClient from "../client";
import * as enrollmentsClient from "./client";
import { enrollCourse as enrollCourseAction } from "./reducer";
import { useNavigate } from "react-router-dom";

export default function EnrollCourseScreen() {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );
  const enrolledEnrollments = useSelector(
    (state: RootState) => state.enrollmentsReducer.enrollments
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await courseClient.fetchAllCourses();
        setAllCourses(courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // Filter courses that the current user is not enrolled in.
  const availableCourses = allCourses.filter((course) => {
    return !enrolledEnrollments.some(
      (enrollment) =>
        enrollment.course === course._id && enrollment.user === currentUser?._id
    );
  });

  const handleEnroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      // enrollInCourse should return an Enrollment object including an _id.
      const enrollment = await enrollmentsClient.enrollInCourse(
        currentUser._id,
        courseId
      );
      dispatch(enrollCourseAction(enrollment));
      // Remove the enrolled course from the available list.
      setAllCourses((prevCourses) =>
        prevCourses.filter((c) => c._id !== courseId)
      );
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  return (
    <div className="p-3">
      <h2>Available Courses for Enrollment</h2>
      <ListGroup>
        {availableCourses.map((course) => (
          <ListGroup.Item
            key={course._id}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{course.name}</strong>
              <div>{course.description}</div>
            </div>
            <Button variant="primary" onClick={() => handleEnroll(course._id)}>
              Enroll
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button
        variant="secondary"
        className="mt-3"
        onClick={() => navigate("/Kambaz/Dashboard")}
      >
        Back to Dashboard
      </Button>
    </div>
  );
}
