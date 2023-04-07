import React from "react";
import Page from "@/components/layout/pageLayout/Page/Page.component";
import BoxedContent from "@/components/layout/pageLayout/BoxedContent/BoxedContent.component";
import UIForm from "@/components/UI/UIForm/UIForm.component";
import { CustomerForm } from "@/features/Admin";

const CustomerAdd = () => {
  const pageprops = {
    title: "Register New Customer",
    breadcrumbs: [
      {
        title: "Customer Management",
        href: "customers",
      },
      {
        title: "Register New Customer",
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
      single: "Customer",
      multiple: "Customers",
    },
    nav: {
      prev: "/",
      next: "/admin/customers",
    },
    mode: "add",
  };

  return (
    <>
      <Page pageprops={pageprops}>
        <BoxedContent title="Enter Customer Details" subtitle="" description="">
          <UIForm params={formParams}>
            <CustomerForm params={formParams} />
          </UIForm>
        </BoxedContent>
      </Page>
    </>
  );
};

export default CustomerAdd;
