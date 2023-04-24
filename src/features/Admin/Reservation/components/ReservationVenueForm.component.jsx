import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Divider,
  Button,
  TextField,
  Grid,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Autocomplete,
  Alert,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import styles from "./../styles/ReservationVenueForm.module.scss";
import {
  addCustomer,
  updateCustomer,
  updateReservation,
} from "@features/Admin";
import { titleOptions } from "@/constants/options/titleOptions";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

const ReservationVenueForm = (props) => {
  const { params, handleSuccessDialog, handleErrorAlert, stepper } = props;
  const { states } = params;
  const { steps, activeStep, setActiveStep, parent } = stepper;

  const dispatch = useDispatch();
  const reservationState = useSelector((state) => state.reservation);
  const alertState = useSelector((state) => state.alert);

  const formikRef = React.createRef();
  const debug = true;

  const validationSchema = Yup.object({
    date: Yup.date().required("Date is required"),
    pax: Yup.number("Pax count should be a number").required(
      "Pax count is Required"
    ),
    ballroom: Yup.string().required("Ballroom is required"),
    session: Yup.string().required("Session is required"),
  });

  const initialValues = {
    date: "",
    pax: "",
    ballroom: "",
    session: "",
  };

  const handleSubmit = (values) => {
    console.log(
      "🚀 ~ file: ReservationVenueForm.component.jsx:58 ~ handleSubmit ~ values:",
      values
    );

    dispatch(updateReservation(reservationState?.currentData?._id, values));

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // if (values && params?.mode === "add") {
    //   dispatch(addCustomer(values));
    // }
    // if (values && params?.mode === "edit") {
    //   dispatch(updateCustomer(params?.data?._id, values));
    // }
  };

  // useEffect(() => {
  //   const handleSuccess = () => {
  //     if (customerState?.currentData && alertState.severity === "success") {
  //       const message = {
  //         title: alertState?.title,
  //         description: alertState?.description,
  //       };

  //       handleSuccessDialog(message);
  //     }
  //   };

  //   const handleError = () => {
  //     if (!customerState?.currentData && alertState.severity === "error") {
  //       const message = {
  //         title: alertState?.title,
  //         description: alertState?.description,
  //       };
  //       handleErrorAlert(message);
  //     }
  //   };

  //   handleSuccess();
  //   handleError();
  // }, [
  //   alertState,
  //   customerState,
  //   handleErrorAlert,
  //   handleSuccessDialog,
  //   params,
  // ]);

  useEffect(() => {
    const prefillData = () => {
      if (params?.mode === "edit" && params?.data) {
        const fields = ["pax", "ballroom", "session"];

        fields.forEach((field) =>
          formikRef.current.setFieldValue(field, params?.data[field], false)
        );
      }
    };

    prefillData();
  }, [formikRef, params?.data, params?.mode]);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        innerRef={formikRef}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          isValid,
          setFieldValue,
        }) => (
          <Form noValidate autoComplete="off">
            <Grid
              container
              spacing={{ xs: 2, sm: 2, md: 4 }}
              sx={{ pt: 0, pb: 0 }}
            >
              <Grid item xs={12}>
                <Alert severity="info">
                  Venue charges are based on the pax count. Location charges
                  will be added if the pax count is below 150
                </Alert>
              </Grid>

              <Grid item xs={12} sx={{ mb: -1 }}>
                <Typography variant="body2">
                  <strong>Date Information</strong>
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  error={touched.date && Boolean(errors.date)}
                  sx={{ height: 40 }}
                >
                  <DatePicker
                    fullWidth
                    id="date"
                    name="date"
                    label="Date"
                    minDate={new Date()}
                    value={values.date}
                    onChange={(newValue) => {
                      setFieldValue("date", newValue);
                    }}
                    variant="standard"
                    size="small"
                    className={styles.picker}
                  />
                  {touched.date && Boolean(errors.date) && (
                    <FormHelperText sx={{ ml: 0 }}>
                      {touched.date && errors.date}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  error={touched.session && Boolean(errors.session)}
                  sx={{ height: 40 }}
                >
                  <InputLabel sx={{ ml: -1.75, mt: values?.session ? 1 : 0 }}>
                    Session
                  </InputLabel>
                  <Select
                    fullWidth
                    id="session"
                    name="session"
                    label="Title"
                    value={values.session}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="standard"
                    sx={{ height: 40 }}
                  >
                    {/* {sessionOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))} */}
                    <MenuItem value="day">Day Session</MenuItem>
                    <MenuItem value="night">Night Session</MenuItem>
                    <MenuItem value="full">All Day Session</MenuItem>
                  </Select>
                  {touched.session && Boolean(errors.session) && (
                    <FormHelperText sx={{ ml: 0 }}>
                      {touched.session && errors.session}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ mb: -1, mt: 2 }}>
                <Typography variant="body2">
                  <strong>Pax Information</strong>
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="pax"
                  name="pax"
                  label="Pax Count"
                  value={values.pax}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.pax && Boolean(errors.pax)}
                  helperText={touched.pax && errors.pax}
                  variant="standard"
                  className={styles.textField}
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sx={{ mb: -1, mt: 2 }}>
                <Typography variant="body2">
                  <strong>Ballroom Information</strong>
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  error={touched.ballroom && Boolean(errors.ballroom)}
                  sx={{ height: 40 }}
                >
                  <InputLabel sx={{ ml: -1.75, mt: values?.ballroom ? 1 : 0 }}>
                    Ballroom
                  </InputLabel>
                  <Select
                    fullWidth
                    id="ballroom"
                    name="ballroom"
                    label="Title"
                    value={values.ballroom}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="standard"
                    sx={{ height: 40 }}
                  >
                    {/* {ballroomOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))} */}
                    <MenuItem value="1">
                      <strong>Ballroom 1</strong> &nbsp; (min 50 / max 300)
                    </MenuItem>
                    <MenuItem value="2">
                      <strong>Ballroom 2</strong> &nbsp; (min 150 / max 400)
                    </MenuItem>
                    <MenuItem value="3">
                      <strong>Ballroom 3</strong> &nbsp; (min 150 / max 600)
                    </MenuItem>
                    <MenuItem value="4">
                      <strong>Ballroom 4</strong> &nbsp; (min 150 / max 1000)
                    </MenuItem>
                  </Select>
                  {touched.ballroom && Boolean(errors.ballroom) && (
                    <FormHelperText sx={{ ml: 0 }}>
                      {touched.ballroom && errors.ballroom}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Stack
                  direction="column-reverse"
                  justifyContent="space-between"
                  align-items="center"
                  sx={{
                    flexDirection: {
                      sm: "row",
                    },
                    mt: 2,
                  }}
                >
                  {/* <Link
                    to={params?.nav?.back ? params?.nav?.back : "../"}
                    style={{ display: "block" }}
                  >
                    <Button
                      size="medium"
                      startIcon={<ArrowBackIcon size="small" />}
                      sx={{ textTransform: "none" }}
                    >
                      Back to {params?.name?.multiple}
                    </Button>
                  </Link> */}

                  <span style={{ flex: 1 }}>&nbsp;</span>

                  <LoadingButton
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    size="large"
                    loading={reservationState?.loading}
                    // loadingPosition="end"
                    sx={{
                      width: {
                        xs: "100%",
                        sm: "auto",
                      },
                    }}
                  >
                    Next
                    {/* {`Save ${params?.name?.single}`} */}
                  </LoadingButton>
                </Stack>
              </Grid>
            </Grid>

            {debug && (
              <>
                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                <pre style={{ textAlign: "left" }}>
                  <strong>Values</strong>
                  <br />
                  {JSON.stringify(values, null, 2)}
                </pre>
                <pre style={{ textAlign: "left" }}>
                  <strong>Errors</strong>
                  <br />
                  {JSON.stringify(errors, null, 2)}
                </pre>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReservationVenueForm;
