import { Link } from "react-router-dom";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">
      <Link to={`/Kambaz/Account/Signin`} className="text-danger">
        {" "}
        Signin{" "}
      </Link>{" "}
      <br />
      <Link to={`/Kambaz/Account/Signup`} className="text-danger">
        {" "}
        Signup{" "}
      </Link>{" "}
      <br />
      <Link to={`/Kambaz/Account/Profile`} className="text-danger">
        {" "}
        Profile{" "}
      </Link>{" "}
      <br />
    </div>
  );
}
