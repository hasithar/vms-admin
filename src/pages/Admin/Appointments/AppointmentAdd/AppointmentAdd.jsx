import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Page from "@/components/layout/pageLayout/Page/Page.component";
import BoxedContent from "@/components/layout/pageLayout/BoxedContent/BoxedContent.component";
import UIForm from "@/components/UI/UIForm/UIForm.component";
import {
  AppointmentForm,
  getAllCustomers,
  getAllUsers,
} from "@/features/Admin";
import { useDispatch, useSelector } from "react-redux";

const AppointmentAdd = () => {
  const dispatch = useDispatch();

  const customerState = useSelector((state) => state.customer);
  const userState = useSelector((state) => state.user);

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

  const pageprops = {
    title: "Create New Appointment",
    breadcrumbs: [
      {
        title: "Appointments",
        href: "appointments",
      },
      {
        title: "Create New Appointment",
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
      single: "Appointment",
      multiple: "Appointments",
    },
    nav: {
      prev: "/",
      next: "/admin/appointments",
    },
    mode: "add",
    states: { customers: customerState, users: userState },
  };

  return (
    <>
      <Page pageprops={pageprops}>
        <BoxedContent
          title="Enter Appointment Details"
          subtitle=""
          description=""
        >
          <Grid container spacing="2">
            <Grid item md={8}>
              <UIForm params={formParams}>
                <AppointmentForm params={formParams} />
              </UIForm>
            </Grid>

            <Grid item md={4}>
              sidebar
            </Grid>
          </Grid>
        </BoxedContent>
      </Page>
    </>
  );
};

export default AppointmentAdd;
