import React, { useEffect, useState } from "react";
import Page from "@/components/layout/pageLayout/Page/Page.component";
import BoxedContent from "@/components/layout/pageLayout/BoxedContent/BoxedContent.component";
import UIForm from "@/components/UI/UIForm/UIForm.component";
import { CustomerForm, getAllCustomers } from "@/features/Admin";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CustomerEdit = () => {
  const dispatch = useDispatch();
  const routerParams = useParams();

  const customerState = useSelector((state) => state.customer);

  const [currentParamData, setCurrentParamData] = useState(null);

  useEffect(() => {
    const getCurrentParam = () => {
      if (customerState?.data?.length === 0) {
        dispatch(getAllCustomers());
      }
      const cp = customerState?.data?.filter(
        (item) => item._id === routerParams?.id
      );

      if (cp) {
        setCurrentParamData(cp[0]);
      }
    };

    getCurrentParam();
  }, [customerState, dispatch, routerParams]);

  const pageprops = {
    title: "Update Customer Details",
    breadcrumbs: [
      {
        title: "Customer Management",
        href: "customers",
      },
      {
        title: "Update Customer Details",
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
    mode: "edit",
    data: currentParamData,
  };

  return (
    <>
      <Page pageprops={pageprops}>
        <BoxedContent
          title="Update Customer Details"
          subtitle=""
          description=""
        >
          <UIForm params={formParams}>
            <CustomerForm params={formParams} />
          </UIForm>
        </BoxedContent>
      </Page>
    </>
  );
};

export default CustomerEdit;
