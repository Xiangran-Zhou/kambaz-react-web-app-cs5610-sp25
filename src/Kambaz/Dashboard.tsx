import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { Course } from "./Courses/types";
import { useSelector } from "react-redux";
import { RootState } from "./store";
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
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  // All courses returned are already filtered for enrollment.
  const displayedCourses = courses;

  const handleGo = (courseId: string) => {
    navigate(`/Kambaz/Courses/${courseId}/Home`);
  };

  return (
    <div id="wd-dashboard">
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
            <Button variant="info" onClick={() => {}}>
              Show All Courses
            </Button>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-end align-items-center">
          <Button variant="info" onClick={() => {}}>
            Show All Courses
          </Button>
          <Button
            variant="primary"
            className="ms-2"
            onClick={() => navigate("../Enroll")}
          >
            Enroll in Courses
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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
