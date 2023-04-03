import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import PageLayout from "@/layout/PageLayout/PageLayout";

const ProtectedAdminRoute = () => {
  // get logged in user from localstorage
  const user = localStorage.getItem("user");

  // check is admin
  // const [admin, setAdmin] = useState(
  //   localStorage.getItem("role") === "admin" ? true : null
  // )

  // check if logged in and redirct to login page
  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  // else return next route
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};

export default ProtectedAdminRoute;
