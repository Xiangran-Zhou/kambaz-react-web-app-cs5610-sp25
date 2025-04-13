import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { RootState } from "../store";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import Users from "./Users";
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
                <Route
                  index
                  element={
                    <Navigate to={currentUser ? "Profile" : "Signin"} replace />
                  }
                />
                <Route path="Signin" element={<Signin />} />
                <Route path="Signup" element={<Signup />} />
                <Route path="Profile" element={<Profile />} />
                <Route path="Users" element={<Users />} />
                <Route path="Users/:uid" element={<Users />} />
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
