import React from "react";
import Page from "@/components/layout/pageLayout/Page/Page.component";
import BoxedContent from "@/components/layout/pageLayout/BoxedContent/BoxedContent.component";
import { UserTable } from "@/features/Admin";

const UserList = () => {
  const pageprops = {
    title: "Users",
    breadcrumbs: [
      {
        title: "User Management",
        href: "users",
      },
      {
        title: "All Users",
        href: "",
      },
    ],
    widgets: {
      header: {
        search: {
          active: false,
          label: "User",
        },
        buttons: {
          active: true,
          links: [
            {
              type: "add",
              color: "primary",
              label: "Add New User",
              href: "/admin/users/add",
            },
          ],
        },
      },
    },
  };

  return (
    <>
      <Page pageprops={pageprops}>
        <BoxedContent title="" subtitle="" description="">
          <UserTable />
        </BoxedContent>
      </Page>
    </>
  );
};

export default UserList;
