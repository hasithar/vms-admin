import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Page from "@/components/layout/pageLayout/Page/Page.component";
import BoxedContent from "@/components/layout/pageLayout/BoxedContent/BoxedContent.component";
import UIForm from "@/components/UI/UIForm/UIForm.component";
import { UserForm } from "@/features/Admin";
import { getAllUsers } from "@/features/Admin";

const UserAdd = () => {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const getUsers = () => {
      dispatch(getAllUsers());
    };

    getUsers();
  }, [dispatch]);

  const pageprops = {
    title: "Register New User",
    breadcrumbs: [
      {
        title: "User Management",
        href: "users",
      },
      {
        title: "Register New User",
        href: "",
      },
    ],
    widgets: {
      header: {
        search: {
          active: false,
          label: "",
        },
        buttons: {
          active: true,
          links: [],
        },
      },
    },
  };

  const formParams = {
    name: {
      single: "User",
      multiple: "Users",
    },
    nav: {
      prev: "/",
      next: "/admin/users",
    },
    mode: "add",
    states: { users: userState },
  };

  return (
    <>
      <Page pageprops={pageprops}>
        <BoxedContent title="Enter User Details" subtitle="" description="">
          <UIForm params={formParams}>
            <UserForm params={formParams} />
          </UIForm>
        </BoxedContent>
      </Page>
    </>
  );
};

export default UserAdd;
