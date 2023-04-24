import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import Page from "@/components/layout/pageLayout/Page/Page.component";
import BoxedContent from "@/components/layout/pageLayout/BoxedContent/BoxedContent.component";
import UIForm from "@/components/UI/UIForm/UIForm.component";
import UIStepperNav from "@/components/UI/UIStepper/UIStepperNav.component";
import {
  ReservationVenueForm,
  ReservationDetailConfirm,
  ReservationCustomerForm,
  getAllCustomers,
  getAllUsers,
} from "@/features/Admin";
// import { ReservationForm, getAllReservations, getAllUsers } from "@/features/Admin";
// import { useDispatch, useSelector } from "react-redux";

const ReservationAdd = () => {
  const dispatch = useDispatch();

  const customerState = useSelector((state) => state.customer);
  const userState = useSelector((state) => state.user);

  const [activeStep, setActiveStep] = useState(0);

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
  const formParams = {
    name: {
      single: "Reservation",
      multiple: "Reservations",
    },
    nav: {
      prev: "/",
      next: "/admin/reservations",
    },
    mode: "add",
    states: { customers: customerState, users: userState },
  };

  const steps = [
    {
      title: "Customer Details",
      component: <ReservationCustomerForm params={formParams} />,
    },
    {
      title: "Package Details",
      component: "",
    },
    {
      title: "Venue Details",

      component: <ReservationVenueForm params={formParams} />,
    },
    {
      title: "Complete",
      componentTitle: "Confirm Reservation  Details",
      component: <ReservationDetailConfirm params={formParams} />,
    },
  ];

  const pageprops = {
    title: "Create New Reservation",
    breadcrumbs: [
      {
        title: "Reservation",
        href: "reservations",
      },
      {
        title: "Create New Reservation",
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
        stepper: {
          active: true,
          steps: steps,
          activeStep: activeStep,
          setActiveStep: setActiveStep,
        },
      },
      footer: {
        stepper: {
          active: true,
          steps: steps,
          activeStep: activeStep,
          setActiveStep: setActiveStep,
          parent: {
            label: "Reservations",
            href: "/admin/reservations",
          },
        },
      },
    },
  };

  return (
    <>
      <Page pageprops={pageprops}>
        <BoxedContent
          title={steps[activeStep]?.componentTitle}
          subtitle=""
          description=""
        >
          <Grid container>
            <Grid item md={8}>
              <UIForm params={formParams}>
                <>{steps[activeStep].component}</>
                {/* <ReservationForm params={formParams} /> */}
              </UIForm>
              Step {activeStep + 1}
              {pageprops?.widgets?.footer?.stepper?.active && (
                <UIStepperNav stepper={pageprops?.widgets?.footer?.stepper} />
              )}
            </Grid>

            <Grid item md={4}>
              Summary
            </Grid>
          </Grid>
        </BoxedContent>
      </Page>
    </>
  );
};

export default ReservationAdd;
