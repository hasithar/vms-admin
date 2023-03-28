import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { userActions } from "../../../actions";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
  Divider,
  FormHelperText,
  Collapse,
  Alert,
  AlertTitle,
  Fade,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Close as CloseIcon,
} from "@mui/icons-material";
// import LoadingButton from "@mui/lab/LoadingButton";
// import { Form, Formik } from "formik";
// import * as Yup from "yup";
// import styles from "./Login.module.scss";

const Login = () => {
  // const dispatch = useDispatch();
  // const alert = useSelector((state) => state.alert);
  // const authentication = useSelector((state) => state.authentication);
  // const navigate = useNavigate();
  // const formikRef = React.createRef();

  // // logiut user upon visiting the login page
  // useEffect(() => {
  //   dispatch(userActions.logout());
  // }, [dispatch]);

  // const debug = false;

  // const [showPassword, setShowpassword] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(true);

  // const validationSchema = Yup.object({
  //   username: Yup.string().required("Username is required"),
  //   password: Yup.string().required("Password is required"),
  // });

  // const initialValues = {
  //   username: "",
  //   password: "",
  // };

  // useEffect(() => {
  //   const updateFormSubmitting = () => {
  //     if (!authentication.loggingIn && !authentication.loggedIn && alert) {
  //       formikRef.current.setSubmitting(false);
  //       // formikRef.current.resetForm();
  //     }
  //   };
  //   updateFormSubmitting();
  // }, [authentication, formikRef, alert]);

  // useEffect(() => {
  //   const updateErrorMessage = () => {
  //     if (alert) {
  //       setShowErrorMessage(true);
  //     }
  //   };
  //   updateErrorMessage();
  // }, [alert]);

  // const handleSubmit = (values, props) => {
  //   // props.setSubmitting(true);
  //   handleLogin(values);
  // };

  // const handleLogin = (values) => {
  //   if (values.username && values.password) {
  //     dispatch(userActions.login(values.username, values.password));
  //   }
  // };

  // if (authentication.loggedIn && authentication.user) {
  //   navigate("./../../dashboard", { replace: true });
  // }

  return (
    <div>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontSize: {
              xs: "1.8rem",
            },
            marginBottom: "0.5rem",
          }}
        >
          Welcome Back!
        </Typography>
        <Typography variant="body2">
          Please log in to your account before continue
        </Typography>

        <Collapse in={alert.type && showErrorMessage}>
          <Alert
            severity={alert.type}
            className={`login-alert login-alert-${alert.type}`}
            sx={{ mt: 3, mb: -1 }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setShowErrorMessage(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <Fade
              in={alert.type && showErrorMessage}
              {...(alert.type && showErrorMessage ? { timeout: 500 } : {})}
            >
              <AlertTitle className="alert-title" sx={{ fontSize: "0.8rem" }}>
                {alert.description}
              </AlertTitle>
            </Fade>

            {/* <Fade
              in={alert.type && showErrorMessage}
              {...(alert.type && showErrorMessage ? { timeout: 1500 } : {})}
            >
              <small>{alert?.message}</small>
            </Fade> */}
          </Alert>
        </Collapse>
      </Box>

      <Box>
        {/* <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          innerRef={formikRef}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            // resetForm();
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
                rowSpacing={2}
                sx={{
                  marginTop: { xs: "0.5rem" },
                  marginBottom: { xs: "1rem" },
                }}
              >
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                    variant="standard"
                    required
                    autoComplete="username"
                    className={styles.textField}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    variant="standard"
                    error={touched.password && Boolean(errors.password)}
                    className={styles.textField}
                  >
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="standard"
                      required
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowpassword(!showPassword);
                            }}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {touched.password && errors.password && (
                      <FormHelperText>{errors.password}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    size="large"
                    variant="contained"
                    color="secondary"
                    sx={{ marginTop: "1rem" }}
                    loading={authentication.loggingIn}
                  >
                    {authentication.loggingIn ? "Signing in" : "Sign in"}
                  </LoadingButton>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    component={RouterLink}
                    to="/auth/forgot-password"
                    size="small"
                    sx={{ padding: 0, marginTop: "1rem", fontSize: "0.75rem" }}
                  >
                    Forgot password?
                  </Button>
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
        </Formik> */}
      </Box>
    </div>
  );
};

export default Login;
