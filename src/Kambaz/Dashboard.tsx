import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { Course } from "./Courses/types"; // Ensure this file exports a proper Course interface
import * as db from "./Database";
import { RootState } from "./store";

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

// Define an Enrollment interface for clarity.
interface Enrollment {
  user: string;
  course: string;
}

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: DashboardProps) {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const enrollments: Enrollment[] = db.enrollments;

  const enrolledCourses = courses.filter((course) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === currentUser?._id && enrollment.course === course._id
    )
  );

  return (
    <div id="wd-dashboard" className="container-fluid">
      <h1 id="wd-dashboard-title" className="mt-3">
        Dashboard
      </h1>
      <hr />
      <h5>
        New Course
        <Button
          variant="warning"
          className="float-end me-2"
          id="wd-update-course-click"
          onClick={updateCourse}
        >
          Update
        </Button>
        <Button
          variant="primary"
          className="float-end"
          id="wd-add-new-course-click"
          onClick={addNewCourse}
        >
          Add
        </Button>
      </h5>
      <br />
      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        as="textarea"
        value={course.description}
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />
      <h2 id="wd-dashboard-published" className="mb-4">
        Published Courses ({enrolledCourses.length})
      </h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {enrolledCourses.map((courseItem) => (
          <Col key={courseItem._id}>
            <Card className="shadow-sm">
              <Link
                to={`/Kambaz/Courses/${courseItem._id}/Home`}
                className="text-decoration-none text-dark"
              >
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
                  <Button variant="primary">Go</Button>
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
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
