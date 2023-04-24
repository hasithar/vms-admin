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
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import styles from "./../styles/ReservationVenueForm.module.scss";
import { addCustomer, updateCustomer } from "@features/Admin";
import { titleOptions } from "@/constants/options/titleOptions";

const ReservationVenueForm = (props) => {
  const { params, handleSuccessDialog, handleErrorAlert } = props;
  const { states } = params;

  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer);
  const alertState = useSelector((state) => state.alert);

  const formikRef = React.createRef();
  const debug = true;

  const validationSchema = Yup.object({
    pax: Yup.number("Pax count should be a number").required(
      "Pax count is Required"
    ),
    ballroom: Yup.string().required("Ballroom is required"),
    session: Yup.string().required("Session is required"),
  });

  const initialValues = {
    pax: "",
    ballroom: "",
    session: "",
  };

  const handleSubmit = (values) => {
    console.log(
      "🚀 ~ file: ReservationVenueForm.component.jsx:58 ~ handleSubmit ~ values:",
      values
    );
    // if (values && params?.mode === "add") {
    //   dispatch(addCustomer(values));
    // }
    // if (values && params?.mode === "edit") {
    //   dispatch(updateCustomer(params?.data?._id, values));
    // }
  };

  useEffect(() => {
    const handleSuccess = () => {
      if (customerState?.currentData && alertState.severity === "success") {
        const message = {
          title: alertState?.title,
          description: alertState?.description,
        };

        handleSuccessDialog(message);
      }
    };

    const handleError = () => {
      if (!customerState?.currentData && alertState.severity === "error") {
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
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="ballroom"
                  name="ballroom"
                  label="Last Name"
                  value={values.ballroom}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.ballroom && Boolean(errors.ballroom)}
                  helperText={touched.ballroom && errors.ballroom}
                  variant="standard"
                  className={styles.textField}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="session"
                  name="session"
                  label="Phone Number"
                  value={values.session}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.session && Boolean(errors.session)}
                  helperText={touched.session && errors.session}
                  variant="standard"
                  className={styles.textField}
                  size="small"
                />
              </Grid>

              {/* <Grid item xs={12}>
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
              </Grid> */}
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
