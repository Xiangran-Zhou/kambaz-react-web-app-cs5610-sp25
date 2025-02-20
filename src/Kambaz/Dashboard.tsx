import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import { courses } from "./Database";

// Function to truncate description
const truncateText = (text: string, limit: number): string => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

export default function Dashboard() {
  return (
    <div id="wd-dashboard" className="container-fluid">
      <h1 id="wd-dashboard-title" className="mt-3">
        Dashboard
      </h1>
      <hr />
      <h2 id="wd-dashboard-published" className="mb-4">
        Published Courses ({courses.length})
      </h2>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {courses.map((course) => (
          <Col key={course._id}>
            <Card className="shadow-sm">
              <Link
                to={`/Kambaz/Courses/${course._id}/Home`}
                className="text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/CourseDemo.jpg"
                  height={160}
                />
                <Card.Body>
                  <Card.Title>{course.name}</Card.Title>
                  <Card.Text className="course-description">
                    {truncateText(course.description, 40)}
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
