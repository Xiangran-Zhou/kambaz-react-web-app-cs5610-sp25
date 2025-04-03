import * as client from "./client";
import { useEffect, useState, ReactNode } from "react";
import { setCurrentUser } from "./accountReducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const currentUser = await client.profile();
        dispatch(setCurrentUser(currentUser));
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error(err);
        }
      }
      setPending(false);
    };

    fetchProfile();
  }, [dispatch]);

  if (!pending) {
    return <>{children}</>;
  }
  return null;
}
