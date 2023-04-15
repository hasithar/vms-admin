import React, { useEffect, useState } from "react";
import Page from "@/components/layout/pageLayout/Page/Page.component";
import BoxedContent from "@/components/layout/pageLayout/BoxedContent/BoxedContent.component";
import UIForm from "@/components/UI/UIForm/UIForm.component";
import { UserForm, getAllUsers } from "@/features/Admin";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserEdit = () => {
  const dispatch = useDispatch();
  const routerParams = useParams();

  const userState = useSelector((state) => state.user);

  const [currentParamData, setCurrentParamData] = useState(null);

  useEffect(() => {
    const getCurrentParam = () => {
      if (userState?.data?.length === 0) {
        dispatch(getAllUsers());
      }
      const cp = userState?.data?.filter(
        (item) => item._id === routerParams?.id
      );

      if (cp) {
        setCurrentParamData(cp[0]);
      }
    };

    getCurrentParam();
  }, [userState, dispatch, routerParams]);

  const pageprops = {
    title: "Update User Details",
    breadcrumbs: [
      {
        title: "User Management",
        href: "users",
      },
      {
        title: "Update User Details",
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
    mode: "edit",
    data: currentParamData,
  };

  return (
    <>
      <Page pageprops={pageprops}>
        <BoxedContent title="Update User Details" subtitle="" description="">
          <UIForm params={formParams}>
            <UserForm params={formParams} />
          </UIForm>
        </BoxedContent>
      </Page>
    </>
  );
};

export default UserEdit;
