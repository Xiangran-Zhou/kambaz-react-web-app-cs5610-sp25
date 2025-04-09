import { useEffect, useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { Course } from "../types";
import * as courseClient from "../client";
import * as enrollmentsClient from "./client";
import { enrollCourse as enrollCourseAction } from "./reducer";
import { useNavigate } from "react-router-dom";

interface EnrollCourseScreenProps {
  refreshDashboard?: () => void;
}

export default function EnrollCourseScreen({
  refreshDashboard,
}: EnrollCourseScreenProps) {
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

  const availableCourses = allCourses.filter((course) => {
    return !enrolledEnrollments.some(
      (enrollment) =>
        enrollment.course === course._id && enrollment.user === currentUser?._id
    );
  });

  const handleEnroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      const enrollment = await enrollmentsClient.enrollInCourse(
        currentUser._id,
        courseId
      );

      // Update Redux state
      dispatch(enrollCourseAction(enrollment));

      // Remove the course from available courses
      setAllCourses((prevCourses) =>
        prevCourses.filter((c) => c._id !== courseId)
      );

      // Force refresh dashboard courses if function provided
      if (refreshDashboard) {
        refreshDashboard();
      }

      // Show success message
      alert("Successfully enrolled in course!");

      // Navigate back to dashboard
      navigate("/Kambaz/Dashboard");
    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert("Failed to enroll in course. Please try again.");
    }
  };

  return (
    <div className="p-3">
      <h2>Available Courses for Enrollment</h2>
      {availableCourses.length === 0 ? (
        <p>No courses available for enrollment.</p>
      ) : (
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
              <Button
                variant="primary"
                onClick={() => handleEnroll(course._id)}
              >
                Enroll
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
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
