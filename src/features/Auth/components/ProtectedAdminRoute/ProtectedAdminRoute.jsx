import React from "react";
import { Outlet } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import { Route, Outlet, useNavigate } from "react-router-dom";
import PageLayout from "@/layout/PageLayout/PageLayout";

const ProtectedAdminRoute = () => {
  // const navigate = useNavigate();

  // get logged in user from localstorage
  // const [user, setUser] = useState(
  //   localStorage.getItem("user") ? true : null
  // )
  // check is admin
  // const [admin, setAdmin] = useState(
  //   localStorage.getItem("role") === "admin" ? true : null
  // )
  // check if logged in and redirct to login page
  // useEffect(() => {
  //   const loginCheck = () => {
  //     if (!user) {
  //       navigate("/auth/login");
  //     }
  //   }

  //   loginCheck();
  // }, [])

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};

export default ProtectedAdminRoute;
