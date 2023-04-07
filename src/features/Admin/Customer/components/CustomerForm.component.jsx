import React, { useEffect } from "react";
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
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import styles from "./../styles/CustomerForm.module.scss";
import { addCustomer } from "../slices/customer.slice";

const CustomerForm = (props) => {
  const { params, handleSuccessDialog, handleErrorAlert } = props;

  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer);
  const alertState = useSelector((state) => state.alert);

  const formikRef = React.createRef();
  const debug = true;

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is Required"),
    firstname: Yup.string()
      .required("Firstname is required")
      .matches(/^[A-Za-z]+$/, "First Name must only contain letters"),
    lastname: Yup.string()
      .required("Lastname is required")
      .matches(/^[A-Za-z]+$/, "Last Name must only contain letters"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9-+]{10,}$/, "Please enter a valid phone number"),
    email: Yup.string().email(),
    address: Yup.string(),
    city: Yup.string(),
    referredBy: Yup.string(),
    assignedTo: Yup.string(),
    status: Yup.number().required("Status is required"),
    comments: Yup.string().max(600),
  });

  const initialValues = {
    title: "",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    referredBy: "",
    assignedTo: "",
    status: 1,
    comments: "",
  };

  const titleOptions = [
    { value: "Mr", label: "Mr" },
    { value: "Mrs", label: "Mrs" },
    { value: "Miss", label: "Miss" },
    { value: "Ms", label: "Ms" },
    { value: "Dr", label: "Dr" },
  ];

  const handleSubmit = (values) => {
    if (values && params?.mode === "add") {
      dispatch(addCustomer(values));
    }
    if (values && params?.mode === "edit") {
      console.log("edit submit");
      // dispatch(
      //   userActions.updateUser(
      //     paramdata.id,
      //     values.firstname,
      //     values.lastname,
      //   )
      // );
    }
  };

  useEffect(() => {
    const handleSuccess = () => {
      if (customerState?.data && alertState.severity === "success") {
        const message = {
          title: alertState?.title,
          description: alertState?.description,
        };

        handleSuccessDialog(message);
      }
    };

    const handleError = () => {
      if (!customerState?.data && alertState.severity === "error") {
        const message = {
          title: alertState?.title,
          description: alertState?.description,
        };
        handleErrorAlert(message);
      }
    };

    handleSuccess();
    handleError();
  }, [
    alertState,
    customerState,
    handleErrorAlert,
    handleSuccessDialog,
    params,
  ]);

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
                    className={styles.textField}
                    sx={{ height: 40 }}

                    // size="small"
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
                  className={styles.textField}
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
                  className={styles.textField}
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
                  className={styles.textField}
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
                  className={styles.textField}
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
              {/* <Grid item xs={12} md={6}>
                referred by
              </Grid>
              <Grid item xs={12} md={6}>
                assigned to
              </Grid> */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="comments"
                  name="comments"
                  label="comments"
                  value={values.comments}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.comments && Boolean(errors.comments)}
                  helperText={touched.comments && errors.comments}
                  variant="standard"
                  className={styles.textField}
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
                  <Link
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
                  </Link>

                  <span style={{ flex: 1 }}>&nbsp;</span>

                  <LoadingButton
                    color="secondary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    size="large"
                    loading={customerState?.loading}
                    // loadingPosition="end"
                    sx={{
                      width: {
                        xs: "100%",
                        sm: "auto",
                      },
                    }}
                  >
                    {`Save ${params?.name?.single}`}
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

export default CustomerForm;
