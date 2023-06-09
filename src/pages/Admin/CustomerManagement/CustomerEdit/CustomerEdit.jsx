import React, { useEffect, useState } from "react";
import Page from "@/components/layout/pageLayout/Page/Page.component";
import BoxedContent from "@/components/layout/pageLayout/BoxedContent/BoxedContent.component";
import UIForm from "@/components/UI/UIForm/UIForm.component";
import { CustomerForm, getAllCustomers, getAllUsers } from "@/features/Admin";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CustomerEdit = () => {
  const dispatch = useDispatch();
  const routerParams = useParams();

  const customerState = useSelector((state) => state.customer);
  const userState = useSelector((state) => state.user);

  const [currentParamData, setCurrentParamData] = useState(null);

  useEffect(() => {
    const getCustomers = () => {
      dispatch(getAllCustomers());
    };

    const getUsers = () => {
      dispatch(getAllUsers());
    };

    getCustomers();
    getUsers();
  }, [dispatch]);

  useEffect(() => {
    const getCurrentParam = () => {
      if (customerState?.allData?.length === 0) {
        dispatch(getAllCustomers());
      }
      const cp = customerState?.allData?.filter(
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
    states: { customers: customerState, users: userState },
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
