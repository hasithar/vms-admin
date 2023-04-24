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
  ToggleButton,
  ToggleButtonGroup,
  Snackbar,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import LoadingButton from "@mui/lab/LoadingButton";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { titleOptions, appointmentStatusOptions } from "@/constants";
import styles from "./../styles/ReservationCustomerForm.module.scss";
import {
  addReservationNewCustomer,
  addReservationExistingCustomer,
} from "@features/Admin";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowNextIcon,
} from "@mui/icons-material";

const ReservationCustomerForm = (props) => {
  const { params, handleSuccessDialog, handleErrorAlert, stepper } = props;
  const { states } = params;
  const { steps, activeStep, setActiveStep, parent } = stepper;

  const dispatch = useDispatch();
  const reservationState = useSelector((state) => state.reservation);
  const alertState = useSelector((state) => state.alert);

  const [autocompleteLoading, setAutocompleteLoading] = useState();
  const [autocompleteOptions, setAutocompleteOptions] = useState({
    referredBy: [],
    assignedTo: [],
    customers: [],
  });
  const [customerType, setCustomerType] = React.useState("new");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleCustomerType = (event, newType) => {
    setCustomerType(newType);
  };

  const formikRef = React.createRef();
  const debug = true;

  const newCustomerSchema = Yup.object({
    title: Yup.string().required("Title is Required"),
    firstname: Yup.string()
      .required("Firstname is required")
      .matches(/^[A-Za-z\s]+$/, "First Name must only contain letters"),
    lastname: Yup.string()
      .required("Lastname is required")
      .matches(/^[A-Za-z\s]+$/, "Last Name must only contain letters"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9-+]{10,}$/, "Please enter a valid phone number"),
    email: Yup.string().email().nullable(true),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    // date: Yup.date().required("Date is required"),
    // time: Yup.date().nullable(true),
    referredBy: Yup.object().shape({
      id: Yup.string(),
      name: Yup.string(),
      refertype: Yup.string(),
    }),
    assignedTo: Yup.object().shape({
      id: Yup.string(),
      name: Yup.string(),
      role: Yup.string(),
    }),
    // status: Yup.string().required("Status is required"),
    comments: Yup.string().max(600).nullable(true),
  });

  const existingCustomerSchema = Yup.object({
    title: Yup.string(),
    firstname: Yup.string().matches(
      /^[A-Za-z\s]+$/,
      "First Name must only contain letters"
    ),
    lastname: Yup.string().matches(
      /^[A-Za-z\s]+$/,
      "Last Name must only contain letters"
    ),
    phone: Yup.string().matches(
      /^[0-9-+]{10,}$/,
      "Please enter a valid phone number"
    ),
    email: Yup.string().email().nullable(true),
    address: Yup.string().nullable(true),
    city: Yup.string().nullable(true),
    // date: Yup.date().required("Date is required"),
    // time: Yup.date().nullable(true),
    referredBy: Yup.object().shape({
      id: Yup.string(),
      name: Yup.string(),
      refertype: Yup.string(),
    }),
    assignedTo: Yup.object().shape({
      id: Yup.string(),
      name: Yup.string(),
      role: Yup.string(),
    }),
    // status: Yup.string().required("Status is required"),
    comments: Yup.string().max(600).nullable(true),
  });

  const validationSchema =
    customerType === "new" ? newCustomerSchema : existingCustomerSchema;

  const initialValues = {
    customer: "",
    title: "",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    // date: "",
    // time: "",
    referredBy: undefined,
    assignedTo: undefined,
    // status: "scheduled",
    comments: "",
  };

  const handleSubmit = (values) => {
    console.log(
      "🚀 ~ file: ReservationCustomerForm.component.jsx:133 ~ handleSubmit ~ values:",
      values
    );
    const customerData = {
      title: values?.title,
      firstname: values?.firstname,
      lastname: values?.lastname,
      phone: values?.phone,
      email: values?.email,
      address: values?.address,
      city: values?.city,
      status: 1,
    };

    const appointMentData = {
      date: values?.date,
      time: values?.time,
      assignedTo: values?.assignedTo,
      referredBy: values?.referredBy,
      comments: values?.comments,
      status: "draft",
    };

    if (values && params?.mode === "add") {
      if (customerType === "new") {
        dispatch(
          addReservationNewCustomer({
            customerData: customerData,
            appointMentData: appointMentData,
          })
        );
      }

      if (customerType === "existing") {
        dispatch(
          addReservationExistingCustomer({
            customerData: values?.customer,
            appointMentData: appointMentData,
          })
        );
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    // if (values && params?.mode === "edit") {
    //   dispatch(updateCustomer(params?.data?._id, values));
    // }
  };

  const formatAutoCompleteData = (customers, users) => {
    setAutocompleteLoading(true);

    let customersFormatted,
      usersFormatted,
      referredByOptions = [];

    customersFormatted = customers?.allData?.map((option) => {
      const firstLetter = option.firstname[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        group: "Customers",
        ...option,
      };
    });

    usersFormatted = users?.allData?.map((option) => {
      const firstLetter = option.firstname[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        group: "Staff",
        ...option,
      };
    });

    if (customersFormatted && usersFormatted) {
      referredByOptions = [...customersFormatted, ...usersFormatted].sort(
        (a, b) => {
          if (a.group.toLowerCase() === b.group.toLowerCase()) {
            return a.firstLetter.toLowerCase() > b.firstLetter.toLowerCase()
              ? 1
              : -1;
          }
          return a.group.toLowerCase() > b.group.toLowerCase() ? 1 : -1;
        }
      );
    }

    setAutocompleteOptions({
      referredBy: referredByOptions,
      assignedTo: usersFormatted,
      customers: customersFormatted,
    });

    setAutocompleteLoading(false);
  };

  useEffect(() => {
    formatAutoCompleteData(states?.customers, states?.users);
  }, [states]);

  // useEffect(() => {
  //   const handleSuccess = () => {
  //     if (reservationState?.currentData && alertState.severity === "success") {
  //       const message = {
  //         title: alertState?.title,
  //         description: alertState?.description,
  //       };

  //       // handleSuccessDialog(message);
  //       // console.log("success");
  //       setOpenSnackbar(true);
  //       setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //     }
  //   };

  //   const handleError = () => {
  //     if (!reservationState?.currentData && alertState.severity === "error") {
  //       const message = {
  //         title: alertState?.title,
  //         description: alertState?.description,
  //       };
  //       handleErrorAlert(message);
  //     }
  //   };

  //   handleSuccess();
  //   handleError();
  // }, [reservationState, alertState]);

  useEffect(() => {
    const prefillData = () => {
      if (params?.mode === "edit" && params?.data) {
        const fields = [
          "title",
          "firstname",
          "lastname",
          "phone",
          "email",
          "address",
          "city",
          "referredBy",
          "assignedTo",
          "status",
          "comments",
        ];

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
                  Appointment can be only made for the dates that does not have
                  any confirmed wedding reservation.
                </Alert>
              </Grid>
              <Grid item xs={12}>
                <ToggleButtonGroup
                  value={customerType}
                  exclusive
                  onChange={handleCustomerType}
                  aria-label="customer type"
                  size="small"
                  color="primary"
                >
                  <ToggleButton value="new" aria-label="new customer">
                    New Customer
                  </ToggleButton>
                  <ToggleButton value="existing" aria-label="existing customer">
                    Existing Customer
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>

              {customerType === "existing" ? (
                <>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      id="customer"
                      name="customer"
                      options={autocompleteOptions.customers.sort(
                        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                      )}
                      getOptionLabel={(option) =>
                        `${option.firstname} ${option.lastname}`
                      }
                      onChange={(event, value) => {
                        setFieldValue("customer", {
                          id: value._id,
                          name: `${value.firstname} ${value.lastname}`,
                          phone: value.phone,
                          email: value.email,
                        });
                      }}
                      fullWidth
                      loading={autocompleteLoading}
                      renderInput={(autocompleteparams) => (
                        <TextField
                          {...autocompleteparams}
                          fullWidth
                          margin="normal"
                          label={
                            <>
                              Customer
                              {/* {params?.mode === "edit" ? (
                            <span>
                              &nbsp;:&nbsp;
                              <strong>{params?.data?.customer?.name}</strong>
                            </span>
                          ) : (
                            ""
                          )} */}
                            </>
                          }
                          variant="standard"
                          size="small"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            touched.customer && errors.customer
                              ? errors.customer
                              : ""
                          }
                          error={Boolean(touched.customer && errors.customer)}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}></Grid>
                </>
              ) : (
                <>
                  <Grid item xs={3} md={2}>
                    <FormControl
                      fullWidth
                      error={touched.title && Boolean(errors.title)}
                      sx={{ height: 40 }}
                    >
                      <InputLabel sx={{ ml: -1.75, mt: values?.title ? 1 : 0 }}>
                        Title
                      </InputLabel>
                      <Select
                        fullWidth
                        id="title"
                        name="title"
                        label="Title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="standard"
                        sx={{ height: 40 }}
                      >
                        {titleOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.title && Boolean(errors.title) && (
                        <FormHelperText sx={{ ml: 0 }}>
                          {touched.title && errors.title}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={9} md={4}>
                    <TextField
                      fullWidth
                      id="firstname"
                      name="firstname"
                      label="First Name"
                      value={values.firstname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstname && Boolean(errors.firstname)}
                      helperText={touched.firstname && errors.firstname}
                      variant="standard"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="lastname"
                      name="lastname"
                      label="Last Name"
                      value={values.lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastname && Boolean(errors.lastname)}
                      helperText={touched.lastname && errors.lastname}
                      variant="standard"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="phone"
                      name="phone"
                      label="Phone Number"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                      variant="standard"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email Address"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      variant="standard"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="address"
                      name="address"
                      label="Address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                      variant="standard"
                      className={styles.textField}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="city"
                      name="city"
                      label="City"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.city && Boolean(errors.city)}
                      helperText={touched.city && errors.city}
                      variant="standard"
                      className={styles.textField}
                      size="small"
                    />
                  </Grid>
                </>
              )}

              {/* <Grid item xs={12} md={6}>
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
                  error={touched.time && Boolean(errors.time)}
                  sx={{ height: 40 }}
                >
                  <TimePicker
                    fullWidth
                    id="time"
                    name="time"
                    label="Time"
                    value={values.time}
                    onChange={(newValue) => {
                      setFieldValue("time", newValue);
                    }}
                    variant="standard"
                    size="small"
                    className={styles.picker}
                  />
                  {touched.time && Boolean(errors.time) && (
                    <FormHelperText sx={{ ml: 0 }}>
                      {touched.time && errors.time}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid> */}
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="referredBy"
                  name="referredBy"
                  options={autocompleteOptions.referredBy}
                  groupBy={(option) => option.group}
                  getOptionLabel={(option) =>
                    `${option.firstname} ${option.lastname}`
                  }
                  onChange={(event, value) => {
                    setFieldValue("referredBy", {
                      id: value._id,
                      name: `${value.firstname} ${value.lastname}`,
                      refertype: value.group === "Staff" ? "user" : "customer",
                    });
                  }}
                  fullWidth
                  loading={autocompleteLoading}
                  renderInput={(autocpmleteparams) => (
                    <TextField
                      {...autocpmleteparams}
                      fullWidth
                      margin="normal"
                      label={
                        <>
                          Referred By
                          {params?.mode === "edit" ? (
                            <span>
                              &nbsp;:&nbsp;
                              <strong>{params?.data?.referredBy?.name}</strong>
                            </span>
                          ) : (
                            ""
                          )}
                        </>
                      }
                      variant="standard"
                      size="small"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.referredBy && errors.referredBy
                          ? errors.referredBy
                          : ""
                      }
                      error={Boolean(touched.referredBy && errors.referredBy)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="assignedTo"
                  name="assignedTo"
                  options={autocompleteOptions.assignedTo.sort(
                    (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                  )}
                  getOptionLabel={(option) =>
                    `${option.firstname} ${option.lastname}`
                  }
                  onChange={(event, value) => {
                    setFieldValue("assignedTo", {
                      id: value._id,
                      name: `${value.firstname} ${value.lastname}`,
                      role: value.role,
                    });
                  }}
                  fullWidth
                  loading={autocompleteLoading}
                  renderInput={(autocompleteparams) => (
                    <TextField
                      {...autocompleteparams}
                      fullWidth
                      margin="normal"
                      label={
                        <>
                          Assigned To
                          {params?.mode === "edit" ? (
                            <span>
                              &nbsp;:&nbsp;
                              <strong>{params?.data?.assignedTo?.name}</strong>
                            </span>
                          ) : (
                            ""
                          )}
                        </>
                      }
                      variant="standard"
                      size="small"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.assignedTo && errors.assignedTo
                          ? errors.assignedTo
                          : ""
                      }
                      error={Boolean(touched.assignedTo && errors.assignedTo)}
                    />
                  )}
                />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  error={touched.status && Boolean(errors.status)}
                  sx={{ height: 40 }}
                >
                  <InputLabel sx={{ ml: -1.75, mt: values?.status ? 1 : 0 }}>
                    Status
                  </InputLabel>
                  <Select
                    fullWidth
                    id="status"
                    name="status"
                    label="Status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="standard"
                    sx={{ height: 40 }}
                  >
                    {appointmentStatusOptions.map((option) => (
                      <MenuItem key={option.slug} value={option.slug}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.status && Boolean(errors.status) && (
                    <FormHelperText sx={{ ml: 0 }}>
                      {touched.status && errors.status}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid> */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="comments"
                  name="comments"
                  label="Comments"
                  value={values.comments}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.comments && Boolean(errors.comments)}
                  helperText={touched.comments && errors.comments}
                  variant="standard"
                  size="small"
                />
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
                    endIcon={<ArrowNextIcon size="small" />}
                    // loadingPosition="end"
                    sx={{
                      width: {
                        xs: "100%",
                        sm: "auto",
                      },
                    }}
                  >
                    {" "}
                    Next
                    {/* {`Save ${params?.name?.single}`} */}
                  </LoadingButton>
                </Stack>
              </Grid>
            </Grid>

            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
            >
              <Alert
                onClose={handleSnackbarClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Customer details updated!
              </Alert>
            </Snackbar>

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

export default ReservationCustomerForm;
