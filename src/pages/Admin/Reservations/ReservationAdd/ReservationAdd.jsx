import React, { useEffect, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid,
} from "@mui/material";

import Page from "@/components/layout/pageLayout/Page/Page.component";
import BoxedContent from "@/components/layout/pageLayout/BoxedContent/BoxedContent.component";
import UIForm from "@/components/UI/UIForm/UIForm.component";
import UIStepper from "@/components/UI/UIStepper/UIStepper.component";
// import { ReservationForm, getAllReservations, getAllUsers } from "@/features/Admin";
// import { useDispatch, useSelector } from "react-redux";

const ReservationAdd = () => {
  // const dispatch = useDispatch();

  // const reservationState = useSelector((state) => state.reservation);
  // const userState = useSelector((state) => state.user);

  const [activeStep, setActiveStep] = useState(0);

  // useEffect(() => {
  //   const getReservations = () => {
  //     dispatch(getAllReservations());
  //   };

  //   const getUsers = () => {
  //     dispatch(getAllUsers());
  //   };

  //   getReservations();
  //   getUsers();
  // }, [dispatch]);

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
        },
      },
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
    // states: { reservations: reservationState, users: userState },
  };

  const steps = [
    "Select campaign settings",
    "Create an ad group",
    "Create an ad",
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Page pageprops={pageprops}>
        <Grid container>
          <Grid item md={8}>
            <BoxedContent
              title="Enter Customer Details"
              subtitle=""
              description=""
            >
              <UIForm params={formParams}>
                {/* <ReservationForm params={formParams} /> */}
              </UIForm>
            </BoxedContent>
          </Grid>

          <Grid item md={4}>
            <BoxedContent title="" subtitle="" description="">
              Summary
            </BoxedContent>
          </Grid>
        </Grid>

        <UIStepper activeStep={activeStep} steps={steps} />

        <Box sx={{ width: "100%" }}>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Step {activeStep + 1}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />

                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Page>
    </>
  );
};

export default ReservationAdd;
