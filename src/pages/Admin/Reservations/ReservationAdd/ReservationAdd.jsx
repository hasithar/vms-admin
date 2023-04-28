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
  ReservationPackageForm,
  getAllCustomers,
  getAllUsers,
} from "@/features/Admin";
// import { ReservationForm, getAllReservations, getAllUsers } from "@/features/Admin";
// import { useDispatch, useSelector } from "react-redux";

const ReservationAdd = () => {
  const dispatch = useDispatch();

  let steps = [];
  let pageprops = {};

  const customerState = useSelector((state) => state.customer);
  const userState = useSelector((state) => state.user);

  const [activeStep, setActiveStep] = useState(0);
  console.log(
    "🚀 ~ file: ReservationAdd.jsx:29 ~ ReservationAdd ~ activeStep:",
    activeStep
  );

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

  const stepper = {
    active: true,
    steps: steps,
    activeStep: activeStep,
    setActiveStep: setActiveStep,
    parent: {
      label: "Reservations",
      href: "/admin/reservations",
    },
  };

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

  pageprops = {
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

  steps = [
    {
      title: "Customer Details",
      component: (
        <ReservationCustomerForm params={formParams} stepper={stepper} />
      ),
    },
    {
      title: "Package Details",
      component: (
        <ReservationPackageForm params={formParams} stepper={stepper} />
      ),
    },
    {
      title: "Venue Details",
      component: <ReservationVenueForm params={formParams} stepper={stepper} />,
    },
    {
      title: "Complete",
      componentTitle: "Confirm Reservation  Details",
      component: <ReservationDetailConfirm params={formParams} />,
    },
  ];

  return (
    <>
      <Page pageprops={pageprops}>
        <BoxedContent
          title={steps[activeStep]?.title}
          subtitle=""
          description=""
        >
          <Grid container>
            <Grid item md={12}>
              <UIForm params={formParams}>
                <>{steps[activeStep].component}</>
                {/* <ReservationForm params={formParams} /> */}
              </UIForm>
              {/* Step {activeStep} */}
              {/* {pageprops?.widgets?.footer?.stepper?.active && (
                <UIStepperNav stepper={pageprops?.widgets?.footer?.stepper} />
              )} */}
            </Grid>

            {/* <Grid item md={4}>
              Summary
            </Grid> */}
          </Grid>
        </BoxedContent>
      </Page>
    </>
  );
};

export default ReservationAdd;
