import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";

const UIStepper = (props) => {
  const { activeStep, steps } = props;

  return (
    <Stepper activeStep={activeStep}>
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};

        return (
          <Step key={label.title} {...stepProps}>
            <StepLabel {...labelProps}>{label.title}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default UIStepper;
