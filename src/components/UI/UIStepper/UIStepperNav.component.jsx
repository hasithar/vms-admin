import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowNextIcon,
} from "@mui/icons-material";

const UIStepperNav = (props) => {
  const { stepper } = props;
  const { steps, activeStep, setActiveStep, parent } = stepper;

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    alert("finish");
  };

  // const handleSkip = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  return (
    <>
      <Box>
        <Stack direction={"row"} justifyContent={"space-between"}>
          {parent && activeStep === 0 && (
            <Button
              size="medium"
              startIcon={<ArrowBackIcon size="small" />}
              sx={{ textTransform: "none" }}
              onClick={() => navigate(parent?.href)}
            >
              Back to {parent?.label}
            </Button>
          )}

          {activeStep > 0 && (
            <Button
              size="medium"
              startIcon={<ArrowBackIcon size="small" />}
              sx={{ textTransform: "none" }}
              onClick={handleBack}
            >
              Back
            </Button>
          )}

          {activeStep === steps.length ? (
            <Button
              size="medium"
              variant="contained"
              // endIcon={<ArrowNextIcon size="small" />}
              sx={{ px: "3rem" }}
              onClick={handleFinish}
            >
              Finish
            </Button>
          ) : (
            <Button
              size="medium"
              variant="contained"
              endIcon={<ArrowNextIcon size="small" />}
              sx={{ px: "3rem" }}
              onClick={handleNext}
            >
              Next
            </Button>
          )}

          {/* <Button onClick={handleReset}>Reset</Button> */}
        </Stack>
      </Box>
    </>
  );
};

export default UIStepperNav;
