import {
  Navigate,
} from "react-router-dom";

import type { ReactNode } from "react";

import { useAuthStore } from "../store/authStore";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({
  children,
}: Props) => {
  const { token } =
    useAuthStore();

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;