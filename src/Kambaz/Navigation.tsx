import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function KambazNavigation() {
  return (
    <div
      id="wd-kambaz-navigation"
      style={{ width: "120px", height: "100vh" }}
      className="list-group rounded-0 position-fixed
       start-0 top-0 bottom-0 bg-black z-2 d-none d-md-flex flex-column"
    >
      <a
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        className="list-group-item bg-black border-0 text-center"
      >
        <img src="/images/NU_CMYK_Notched-N_wordmark_RW.png" width="75px" />
      </a>

      <Link
        to="/Kambaz/Account"
        id="wd-account-link"
        className="list-group-item text-center border-0 bg-black text-white"
      >
        <FaRegCircleUser className="fs-1 text-white" />
        <div>Account</div>
      </Link>

      <Link
        to="/Kambaz/Dashboard"
        id="wd-dashboard-link"
        className="list-group-item text-center border-0
                  bg-white text-danger"
      >
        <AiOutlineDashboard className="fs-1 text-danger" />
        <div>Dashboard</div>
      </Link>

      <Link
        to="/Kambaz/Dashboard"
        id="wd-course-link"
        className="list-group-item text-white
                  bg-black text-center border-0"
      >
        <LiaBookSolid className="fs-1 text-danger" />
        <div>Courses</div>
      </Link>

      <Link
        to="/Kambaz/Calendar"
        id="wd-calendar-link"
        className="list-group-item text-white
                  bg-black text-center border-0"
      >
        <IoCalendarOutline className="fs-1 text-warning" />
        <div>Calendar</div>
      </Link>

      <Link
        to="/Kambaz/Inbox"
        id="wd-inbox-link"
        className="list-group-item text-white
                  bg-black text-center border-0"
      >
        <FaInbox className="fs-1 text-info" />
        <div>Inbox</div>
      </Link>

      <Link
        to="/Labs"
        id="wd-labs-link"
        className="list-group-item text-white
                  bg-black text-center border-0"
      >
        <LiaCogSolid className="fs-1 text-primary" />
        <div>Labs</div>
      </Link>
    </div>
  );
}
