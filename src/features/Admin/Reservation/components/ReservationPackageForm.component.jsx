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
  Card,
  CardContent,
  Typography,
  Box,
  SvgIcon,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import LoadingButton from "@mui/lab/LoadingButton";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { titleOptions, appointmentStatusOptions } from "@/constants";
import styles from "./../styles/ReservationPackageForm.module.scss";
import {
  addReservationNewCustomer,
  addReservationExistingCustomer,
  updateReservation,
} from "@features/Admin";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowNextIcon,
} from "@mui/icons-material";
import { parameterTypes } from "@/constants";

const ReservationPackageForm = (props) => {
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
  const debug = false;

  const validationSchema = Yup.object({
    package: Yup.string().required("Package is Required"),
    // firstname: Yup.string()
    //   .required("Firstname is required")
    //   .matches(/^[A-Za-z\s]+$/, "First Name must only contain letters"),
    // lastname: Yup.string()
    //   .required("Lastname is required")
    //   .matches(/^[A-Za-z\s]+$/, "Last Name must only contain letters"),
    // phone: Yup.string()
    //   .required("Phone number is required")
    //   .matches(/^[0-9-+]{10,}$/, "Please enter a valid phone number"),
    // email: Yup.string().email().nullable(true),
    // address: Yup.string().required("Address is required"),
    // city: Yup.string().required("City is required"),
    // // date: Yup.date().required("Date is required"),
    // // time: Yup.date().nullable(true),
    // referredBy: Yup.object().shape({
    //   id: Yup.string(),
    //   name: Yup.string(),
    //   refertype: Yup.string(),
    // }),
    // assignedTo: Yup.object().shape({
    //   id: Yup.string(),
    //   name: Yup.string(),
    //   role: Yup.string(),
    // }),
    // // status: Yup.string().required("Status is required"),
    // comments: Yup.string().max(600).nullable(true),
  });

  const initialValues = {
    package: "",
    // title: "",
    // firstname: "",
    // lastname: "",
    // phone: "",
    // email: "",
    // address: "",
    // city: "",
    // // date: "",
    // // time: "",
    // referredBy: undefined,
    // assignedTo: undefined,
    // // status: "scheduled",
    // comments: "",
  };

  const handleSubmit = (values) => {
    console.log(
      "🚀 ~ file: ReservationPackageForm.component.jsx:133 ~ handleSubmit ~ values:",
      values
    );

    dispatch(updateReservation(reservationState?.currentData?._id, values));

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // const customerData = {
    //   title: values?.title,
    //   firstname: values?.firstname,
    //   lastname: values?.lastname,
    //   phone: values?.phone,
    //   email: values?.email,
    //   address: values?.address,
    //   city: values?.city,
    //   status: 1,
    // };

    // const appointMentData = {
    //   date: values?.date,
    //   time: values?.time,
    //   assignedTo: values?.assignedTo,
    //   referredBy: values?.referredBy,
    //   comments: values?.comments,
    //   status: "draft",
    // };

    // if (values && params?.mode === "add") {
    //   if (customerType === "new") {
    //     dispatch(
    //       addReservationNewCustomer({
    //         customerData: customerData,
    //         appointMentData: appointMentData,
    //       })
    //     );
    //   }

    //   if (customerType === "existing") {
    //     dispatch(
    //       addReservationExistingCustomer({
    //         customerData: values?.customer,
    //         appointMentData: appointMentData,
    //       })
    //     );
    //   }
    // }

    // if (values && params?.mode === "edit") {
    //   dispatch(updateCustomer(params?.data?._id, values));
    // }
  };

  // const formatAutoCompleteData = (customers, users) => {
  //   setAutocompleteLoading(true);

  //   let customersFormatted,
  //     usersFormatted,
  //     referredByOptions = [];

  //   customersFormatted = customers?.allData?.map((option) => {
  //     const firstLetter = option.firstname[0].toUpperCase();
  //     return {
  //       firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
  //       group: "Customers",
  //       ...option,
  //     };
  //   });

  //   usersFormatted = users?.allData?.map((option) => {
  //     const firstLetter = option.firstname[0].toUpperCase();
  //     return {
  //       firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
  //       group: "Staff",
  //       ...option,
  //     };
  //   });

  //   if (customersFormatted && usersFormatted) {
  //     referredByOptions = [...customersFormatted, ...usersFormatted].sort(
  //       (a, b) => {
  //         if (a.group.toLowerCase() === b.group.toLowerCase()) {
  //           return a.firstLetter.toLowerCase() > b.firstLetter.toLowerCase()
  //             ? 1
  //             : -1;
  //         }
  //         return a.group.toLowerCase() > b.group.toLowerCase() ? 1 : -1;
  //       }
  //     );
  //   }

  //   setAutocompleteOptions({
  //     referredBy: referredByOptions,
  //     assignedTo: usersFormatted,
  //     customers: customersFormatted,
  //   });

  //   setAutocompleteLoading(false);
  // };

  // useEffect(() => {
  //   formatAutoCompleteData(states?.customers, states?.users);
  // }, [states]);

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
                  Menu customizations and additional items can be added later
                  from customer portal
                </Alert>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  error={touched.package && Boolean(errors.package)}
                  sx={{ height: 40 }}
                >
                  <InputLabel sx={{ ml: -1.75, mt: values?.package ? 1 : 0 }}>
                    Package
                  </InputLabel>
                  <Select
                    fullWidth
                    id="package"
                    name="package"
                    label="Title"
                    value={values.package}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="standard"
                    sx={{ height: 40 }}
                  >
                    {/* {packageOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))} */}
                    <MenuItem value="bronze">
                      <strong>Bronze Package</strong> &nbsp; (4500 LKR)
                    </MenuItem>
                    <MenuItem value="silver">
                      <strong>Silver Package</strong> &nbsp; (5500 LKR)
                    </MenuItem>
                    <MenuItem value="gold">
                      <strong>Gold Package</strong> &nbsp; (6500 LKR)
                    </MenuItem>
                    <MenuItem value="platinum">
                      <strong>Platinum Package</strong> &nbsp; (7500 LKR)
                    </MenuItem>
                  </Select>
                  {touched.package && Boolean(errors.package) && (
                    <FormHelperText sx={{ ml: 0 }}>
                      {touched.package && errors.package}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* <Grid item xs={12} md={6}>
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
              </Grid> */}

              {/* <Grid container spacing={2}>
                {parameterTypes.map((parameter) => (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={3}
                    lg={3}
                    xl={2}
                    key={parameter.id}
                    sx={{
                      flexBasis: { lg: "20%", xl: "16.6666%" },
                      maxWidth: { lg: "20%", xl: "16.6666%" },
                    }}
                  >
                    <ParameterCard
                      title={parameter.title}
                      description={parameter.description}
                      icon={parameter.icon}
                      slug={parameter.slug}
                    />
                  </Grid>
                ))}
              </Grid> */}

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

export default ReservationPackageForm;

const ParameterIcon = ({ icon }) => {
  return <div dangerouslySetInnerHTML={{ __html: icon }} />;
};

const ParameterCard = (props) => {
  const { title, description, icon, slug } = props;

  return (
    <Button
      component={Link}
      to={`${slug}`}
      variant="contained"
      color="primary"
      sx={{ p: 0, height: "100%", width: "100%" }}
    >
      <Card sx={{ backgroundColor: "transparent" }} className={styles.card}>
        <CardContent className={styles.cardContent}>
          <Stack className={styles.cardIn}>
            <Box sx={{ borderRadius: "50%" }} className={styles.icon}>
              <ParameterIcon icon={icon} />
            </Box>

            {title && (
              <Typography variant="h5" className={styles.title}>
                {title}
              </Typography>
            )}
            <Typography variant="body2" className={styles.subtitle}>
              {description ? description : `Manage ${title}`}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Button>
  );
};
