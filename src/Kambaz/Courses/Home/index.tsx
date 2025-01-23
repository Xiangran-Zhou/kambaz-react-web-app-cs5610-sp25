import Modules from "../Modules";
import CourseStatus from "./Status";
export default function Home() {
  return (
    <div
      id="wd-home"
      style={{
        display: "grid",
        gridTemplateColumns: "3fr 1fr",
        gap: "20px",
      }}
    >
      <div>
        <Modules />
      </div>
      <div>
        <CourseStatus />
      </div>
    </div>
  );
}
