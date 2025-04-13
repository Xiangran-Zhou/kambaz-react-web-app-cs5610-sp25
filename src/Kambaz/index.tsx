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
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import * as enrollmentsClient from "./Courses/Enrollments/client";
import { setEnrollments } from "./Courses/Enrollments/reducer";
import EnrollCourseScreen from "./Courses/Enrollments/EnrollCourseScreen";
import People from "./Courses/People";

// Define an Enrollment type
interface Enrollment {
  _id: string;
  user: string;
  course: string;
  grade?: number;
  letterGrade?: string;
  enrollmentDate?: Date;
  status?: "ENROLLED" | "DROPPED" | "COMPLETED";
}

export default function Kambaz() {
  const [courses, setCourses] = useState<Course[]>([]);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const [enrolling, setEnrolling] = useState<boolean>(false);

  const findCoursesForUser = useCallback(async (): Promise<void> => {
    if (!currentUser) return;
    try {
      const fetchedCourses: Course[] = await userClient.findCoursesForUser(
        currentUser._id
      );
      setCourses(fetchedCourses);
    } catch (error) {
      console.error(error);
    }
  }, [currentUser]);

  const fetchCourses = useCallback(async (): Promise<void> => {
    if (!currentUser) return;
    try {
      const allCourses: Course[] = await courseClient.fetchAllCourses();
      const enrolledCourses: Course[] = await userClient.findCoursesForUser(
        currentUser._id
      );
      const coursesWithEnrollFlag: Course[] = allCourses.map(
        (course: Course) => {
          if (enrolledCourses.find((c: Course) => c._id === course._id)) {
            return { ...course, enrolled: true };
          }
          return course;
        }
      );
      setCourses(coursesWithEnrollFlag);
    } catch (error) {
      console.error(error);
    }
  }, [currentUser]);

  const fetchEnrollments = useCallback(async (): Promise<void> => {
    if (!currentUser) return;
    try {
      const allEnrollments: Enrollment[] =
        await enrollmentsClient.findAllEnrollments();
      const userEnrollments = allEnrollments.filter(
        (e: Enrollment) => e.user === currentUser._id
      );
      dispatch(setEnrollments(userEnrollments));
    } catch (error) {
      console.error(error);
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (currentUser) {
      fetchEnrollments();
      if (enrolling) {
        fetchCourses();
      } else {
        findCoursesForUser();
      }
    }
  }, [
    currentUser,
    enrolling,
    fetchEnrollments,
    fetchCourses,
    findCoursesForUser,
  ]);

  useEffect(() => {
    if (location.pathname === "/Kambaz/Dashboard" && currentUser) {
      fetchCourses();
    }
  }, [location.pathname, currentUser, fetchCourses]);

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

  const addNewCourse = useCallback(async (): Promise<void> => {
    try {
      if (!currentUser) return;
      const newCourse = await courseClient.createCourse(course);
      setCourses([...courses, newCourse]);
    } catch (error) {
      console.error(error);
    }
  }, [currentUser, course, courses]);

  const deleteCourseHandler = useCallback(
    async (courseId: string): Promise<void> => {
      try {
        await courseClient.deleteCourse(courseId);
        setCourses(courses.filter((c: Course) => c._id !== courseId));
      } catch (error) {
        console.error(error);
      }
    },
    [courses]
  );

  const updateCourseHandler = useCallback(async (): Promise<void> => {
    try {
      await courseClient.updateCourse(course);
      await fetchCourses();
    } catch (error) {
      console.error(error);
    }
  }, [course, fetchCourses]);

  // updateEnrollment uses a functional state update to correctly toggle enrolled flag
  const updateEnrollment = useCallback(
    async (courseId: string, enrolled: boolean): Promise<void> => {
      if (!currentUser) return;
      try {
        if (enrolled) {
          await userClient.enrollIntoCourse(currentUser._id, courseId);
        } else {
          await userClient.unenrollFromCourse(currentUser._id, courseId);
        }
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course._id === courseId ? { ...course, enrolled } : course
          )
        );
      } catch (error) {
        console.error(error);
      }
    },
    [currentUser]
  );

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
                    enrolling={enrolling}
                    setEnrolling={setEnrolling}
                    updateEnrollment={updateEnrollment}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="Courses/:cid/People"
              element={
                <ProtectedRoute>
                  <People />
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
