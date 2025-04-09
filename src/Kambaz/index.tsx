import { useState, useEffect, useCallback } from "react";
import KambazNavigation from "./Navigation";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";
import Account from "./Account";
import { Course } from "./Courses/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import * as enrollmentsClient from "./Courses/Enrollments/client";
import { setEnrollments } from "./Courses/Enrollments/reducer";
import EnrollCourseScreen from "./Courses/Enrollments/EnrollCourseScreen";

export default function Kambaz() {
  // Initialize courses as an empty array.
  const [courses, setCourses] = useState<Course[]>([]);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const enrollments = useSelector(
    (state: RootState) => state.enrollmentsReducer.enrollments
  );
  const dispatch = useDispatch();
  const location = useLocation();

  // Use useCallback to memoize the fetch functions
  const fetchCourses = useCallback(async () => {
    if (!currentUser) return;
    try {
      const courses = await userClient.findMyCourses();
      setCourses(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, [currentUser]);

  const fetchEnrollments = useCallback(async () => {
    if (!currentUser) return;
    try {
      const allEnrollments = await enrollmentsClient.findAllEnrollments();
      const userEnrollments = allEnrollments.filter(
        (e) => e.user === currentUser._id
      );
      dispatch(setEnrollments(userEnrollments));
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  }, [currentUser, dispatch]);

  // Fetch initial data when user changes
  useEffect(() => {
    if (currentUser) {
      fetchEnrollments();
      fetchCourses();
    }
  }, [currentUser, fetchEnrollments, fetchCourses]);

  // Refresh courses when enrollments change
  useEffect(() => {
    if (currentUser && enrollments.length > 0) {
      fetchCourses();
    }
  }, [enrollments, currentUser, fetchCourses]);

  // Refresh data when returning to Dashboard
  useEffect(() => {
    if (location.pathname === "/Kambaz/Dashboard" && currentUser) {
      fetchCourses();
    }
  }, [location.pathname, currentUser, fetchCourses]);

  // Course state and operations
  const [course, setCourse] = useState<Course>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    department: "",
    credits: 3,
    description: "New Description",
    image: "",
  });

  const addNewCourse = async () => {
    try {
      const newCourse = await userClient.createCourse(course);
      setCourses([...courses, newCourse]);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete course handler using the courses client.
  const deleteCourseHandler = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error(error);
    }
  };

  // Update course handler: send updated course to server then replace it in local state.
  const updateCourseHandler = async () => {
    try {
      const updatedCourse = await courseClient.updateCourse(course);
      setCourses(
        courses.map((c) => (c._id === course._id ? updatedCourse : c))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Account/*" element={<Account />} />
            <Route
              path="Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourseHandler}
                    updateCourse={updateCourseHandler}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />
            <Route
              path="Enroll"
              element={
                <ProtectedRoute>
                  <EnrollCourseScreen refreshDashboard={fetchCourses} />
                </ProtectedRoute>
              }
            />
            <Route path="Calendar" element={<h1>Calendar</h1>} />
            <Route path="Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
