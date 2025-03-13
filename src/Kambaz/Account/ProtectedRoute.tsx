import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  return currentUser ? children : <Navigate to="/Kambaz/Account/Signin" />;
}
