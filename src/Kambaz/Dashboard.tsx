import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard" className="container-fluid">
      <h1 id="wd-dashboard-title" className="mt-3">
        Dashboard
      </h1>
      <hr />
      <h2 id="wd-dashboard-published" className="mb-4">
        Published Courses (8)
      </h2>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {/* Course 1 */}
        <Col>
          <Card className="shadow-sm">
            <Link
              to="/Kambaz/Courses/1234/Home"
              className="text-decoration-none text-dark"
            >
              <Card.Img
                variant="top"
                src="/images/CourseDemo.jpg"
                height={160}
              />
              <Card.Body>
                <Card.Title>CS1234 React JS</Card.Title>
                <Card.Text>Full Stack Software Developer</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        {/* Course 2 */}
        <Col>
          <Card className="shadow-sm">
            <Link
              to="/Kambaz/Courses/1235/Home"
              className="text-decoration-none text-dark"
            >
              <Card.Img
                variant="top"
                src="/images/CourseDemo.jpg"
                height={160}
              />
              <Card.Body>
                <Card.Title>CS1235 Web Development</Card.Title>
                <Card.Text>Building modern web applications</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        {/* Course 3 */}
        <Col>
          <Card className="shadow-sm">
            <Link
              to="/Kambaz/Courses/1236/Home"
              className="text-decoration-none text-dark"
            >
              <Card.Img
                variant="top"
                src="/images/CourseDemo.jpg"
                height={160}
              />
              <Card.Body>
                <Card.Title>CS1236 Database Systems</Card.Title>
                <Card.Text>Learn SQL and NoSQL databases</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        {/* Course 4 */}
        <Col>
          <Card className="shadow-sm">
            <Link
              to="/Kambaz/Courses/1237/Home"
              className="text-decoration-none text-dark"
            >
              <Card.Img
                variant="top"
                src="/images/CourseDemo.jpg"
                height={160}
              />
              <Card.Body>
                <Card.Title>CS1237 Algorithms</Card.Title>
                <Card.Text>Master data structures & algorithms</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        {/* Course 5 */}
        <Col>
          <Card className="shadow-sm">
            <Link
              to="/Kambaz/Courses/1238/Home"
              className="text-decoration-none text-dark"
            >
              <Card.Img
                variant="top"
                src="/images/CourseDemo.jpg"
                height={160}
              />
              <Card.Body>
                <Card.Title>CS1238 Machine Learning</Card.Title>
                <Card.Text>Introduction to ML and AI concepts</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        {/* Course 6 */}
        <Col>
          <Card className="shadow-sm">
            <Link
              to="/Kambaz/Courses/1239/Home"
              className="text-decoration-none text-dark"
            >
              <Card.Img
                variant="top"
                src="/images/CourseDemo.jpg"
                height={160}
              />
              <Card.Body>
                <Card.Title>CS1239 Cyber Security</Card.Title>
                <Card.Text>Learn cybersecurity fundamentals</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        {/* Course 7 */}
        <Col>
          <Card className="shadow-sm">
            <Link
              to="/Kambaz/Courses/1240/Home"
              className="text-decoration-none text-dark"
            >
              <Card.Img
                variant="top"
                src="/images/CourseDemo.jpg"
                height={160}
              />
              <Card.Body>
                <Card.Title>CS1240 Cloud Computing</Card.Title>
                <Card.Text>Introduction to AWS, Azure, and GCP</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        {/* Course 8 */}
        <Col>
          <Card className="shadow-sm">
            <Link
              to="/Kambaz/Courses/1241/Home"
              className="text-decoration-none text-dark"
            >
              <Card.Img
                variant="top"
                src="/images/CourseDemo.jpg"
                height={160}
              />
              <Card.Body>
                <Card.Title>CS1241 DevOps</Card.Title>
                <Card.Text>CI/CD, Docker, and Kubernetes</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
