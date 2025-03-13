import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { RootState } from "../store";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile"; // This now imports the Profile component
import AccountNavigation from "./Navigation";

export default function Account() {
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );

  return (
    <div id="wd-account-screen">
      <table>
        <tbody>
          <tr>
            <td valign="top">
              <AccountNavigation />
            </td>
            <td valign="top">
              <Routes>
                {/* Default route: Navigate to Profile if signed in, otherwise Signin */}
                <Route
                  index
                  element={
                    <Navigate to={currentUser ? "Profile" : "Signin"} replace />
                  }
                />
                <Route path="Signin" element={<Signin />} />
                <Route path="Signup" element={<Signup />} />
                <Route path="Profile" element={<Profile />} />
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
