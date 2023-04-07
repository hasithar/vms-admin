import React from "react";
import Page from "@/components/layout/pageLayout/Page/Page.component";
import BoxedContent from "@/components/layout/pageLayout/BoxedContent/BoxedContent.component";
import { CustomerTable } from "@/features/Admin";

const CustomersList = () => {
  const pageprops = {
    title: "Customers",
    breadcrumbs: [
      {
        title: "Customer Management",
        href: "customers",
      },
      {
        title: "All Customers",
        href: "",
      },
    ],
    widgets: {
      header: {
        search: {
          active: false,
          label: "Customer",
        },
        buttons: {
          active: true,
          links: [
            {
              type: "add",
              color: "primary",
              label: "Add New Customer",
              href: "/admin/customers/add",
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
          <CustomerTable />
        </BoxedContent>
      </Page>
    </>
  );
};

export default CustomersList;
