import KambazNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";
import Account from "./Account";
import { useState } from "react";
import { Course } from "./Courses/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { addCourse, deleteCourse, updateCourse } from "./Courses/reducer";

export default function Kambaz() {
  // Get courses from Redux
  const courses = useSelector(
    (state: RootState) => state.coursesReducer.courses
  );
  const dispatch = useDispatch();

  // Local state for the course in the form (for adding/updating)
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

  const addNewCourse = () => {
    // Dispatch action without _id; the reducer will add one
    dispatch(
      addCourse({
        name: course.name,
        number: course.number,
        startDate: course.startDate,
        endDate: course.endDate,
        department: course.department,
        credits: course.credits,
        description: course.description,
        image: course.image,
      })
    );
  };

  const deleteCourseHandler = (courseId: string) => {
    dispatch(deleteCourse(courseId));
  };

  const updateCourseHandler = () => {
    dispatch(updateCourse(course));
  };

  return (
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
          <Route path="Calendar" element={<h1>Calendar</h1>} />
          <Route path="Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
  );
}
