import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import PortalLayout from "@/layout/PortalLayout/PortalLayout";

const ProtectedPortalRoute = () => {
  // get logged in user from localstorage
  const user = localStorage.getItem("user");

  // check is admin
  // const [admin, setAdmin] = useState(
  //   localStorage.getItem("role") === "admin" ? true : null
  // )

  // check if logged in and redirct to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // else return next route
  return (
    <PortalLayout>
      <Outlet />
    </PortalLayout>
  );
};

export default ProtectedPortalRoute;
