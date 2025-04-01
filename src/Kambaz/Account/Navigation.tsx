import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store"; // Adjust path if needed

export default function AccountNavigation() {
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );

  return (
    <div id="wd-account-navigation">
      {!currentUser && (
        <>
          <div style={{ marginBottom: "0.5rem" }}>
            <Link to="/Kambaz/Account/Signin" className="text-danger">
              Signin
            </Link>
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <Link to="/Kambaz/Account/Signup" className="text-danger">
              Signup
            </Link>
          </div>
        </>
      )}
      {currentUser && (
        <div style={{ marginBottom: "0.5rem" }}>
          <Link to="/Kambaz/Account/Profile" className="text-danger">
            Profile
          </Link>
        </div>
      )}
    </div>
  );
}
