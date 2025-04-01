import { useState } from "react";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { Course } from "./Courses/types";
import { RootState } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { enrollCourse, unenrollCourse } from "./Courses/Enrollments/reducer";
import { useNavigate } from "react-router-dom";

const truncateText = (text: string, limit: number): string =>
  text.length > limit ? text.substring(0, limit) + "..." : text;

interface DashboardProps {
  courses: Course[];
  course: Course;
  setCourse: (course: Course) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: DashboardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const enrollments = useSelector(
    (state: RootState) => state.enrollmentsReducer.enrollments
  );

  // Local state: if true, show all courses; if false, show only enrolled courses.
  const [showAll, setShowAll] = useState<boolean>(false);

  // Check if the current user is enrolled in a course.
  const isEnrolled = (courseId: string): boolean => {
    if (!currentUser) return false;
    return enrollments.some(
      (en) => en.user === currentUser._id && en.course === courseId
    );
  };

  // Determine courses to display based on toggle state.
  const displayedCourses = showAll
    ? courses
    : courses.filter((c) => isEnrolled(c._id));

  // Handlers for enrollment buttons.
  const handleEnroll = (courseId: string) => {
    if (currentUser) {
      dispatch(enrollCourse({ user: currentUser._id, course: courseId }));
    }
  };

  const handleUnenroll = (courseId: string) => {
    if (currentUser) {
      dispatch(unenrollCourse({ user: currentUser._id, course: courseId }));
    }
  };

  // Handler for the "Go" button. Only navigates if the user is enrolled.
  const handleGo = (courseId: string) => {
    if (isEnrolled(courseId)) {
      navigate(`/Kambaz/Courses/${courseId}/Home`);
    } else {
      alert("You are not enrolled in this course!");
    }
  };

  return (
    <div id="wd-dashboard" className="container-fluid">
      <h1 id="wd-dashboard-title" className="mt-3">
        Dashboard
      </h1>
      <hr />
      {currentUser?.role === "FACULTY" ? (
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5>
              New Course
              <Button
                variant="warning"
                className="ms-2"
                id="wd-update-course-click"
                onClick={updateCourse}
              >
                Update
              </Button>
              <Button
                variant="primary"
                className="ms-2"
                id="wd-add-new-course-click"
                onClick={addNewCourse}
              >
                Add
              </Button>
            </h5>
            <FormControl
              value={course.name}
              className="mb-2 mt-2"
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
            />
            <FormControl
              as="textarea"
              value={course.description}
              rows={3}
              onChange={(e) =>
                setCourse({ ...course, description: e.target.value })
              }
            />
          </div>
          <div>
            <Button variant="info" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Enrolled Only" : "Show All Courses"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-end align-items-center">
          <Button variant="info" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Enrolled Only" : "Show All Courses"}
          </Button>
        </div>
      )}
      <hr />
      <h2 id="wd-dashboard-published" className="mb-4">
        Published Courses ({displayedCourses.length})
      </h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {displayedCourses.map((courseItem) => (
          <Col key={courseItem._id}>
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={courseItem.image || "/images/CourseDemo.jpg"}
                height={160}
              />
              <Card.Body>
                <Card.Title>{courseItem.name}</Card.Title>
                <Card.Text className="course-description">
                  {truncateText(courseItem.description, 40)}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleGo(courseItem._id)}
                >
                  Go
                </Button>
                {currentUser?.role === "FACULTY" && (
                  <>
                    <Button
                      variant="warning"
                      className="float-end me-2"
                      id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(courseItem);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="float-end"
                      id="wd-delete-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(courseItem._id);
                      }}
                    >
                      Delete
                    </Button>
                  </>
                )}
                <div className="mt-2">
                  {isEnrolled(courseItem._id) ? (
                    <Button
                      variant="danger"
                      onClick={() => handleUnenroll(courseItem._id)}
                    >
                      Unenroll
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      onClick={() => handleEnroll(courseItem._id)}
                    >
                      Enroll
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
