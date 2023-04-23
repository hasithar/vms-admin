import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Divider,
  Button,
  TextField,
  Grid,
  Stack,
  FormGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Select,
  RadioGroup,
  Radio,
  Switch,
  MenuItem,
  FormHelperText,
  InputAdornment,
  IconButton,
  Input,
  Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { addUser, updateUser } from "../slices/user.slice";
import styles from "./../styles/UserForm.module.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { genderOptions, userRoleOptions, userTypes } from "@/constants";

const UserForm = (props) => {
  const { params, handleSuccessDialog, handleErrorAlert } = props;
  const { mode } = params;
  const { states } = params;

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const alertState = useSelector((state) => state.alert);

  const formikRef = React.createRef();
  const debug = false;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginStatusToggle, setLoginStatusToggle] = useState(false);
  const [loginFieldValidation, setLoginFieldValidation] = useState(false);
  const [autocompleteLoading, setAutocompleteLoading] = useState();
  const [autocompleteOptions, setAutocompleteOptions] = useState({
    managedBy: [],
  });

  const commonSchema = Yup.object({
    firstname: Yup.string()
      .required("Firstname is required")
      .matches(/^[a-zA-Z\s]+$/, "First Name must only contain letters"),
    lastname: Yup.string()
      .required("Lastname is required")
      .matches(/^[a-zA-Z\s]+$/, "Last Name must only contain letters"),
    gender: Yup.string().required("Gender is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9-+]{10,}$/, "Please enter a valid phone number"),
    email: Yup.string().email().nullable(true),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    type: Yup.string().nullable(true),
    role: Yup.string().nullable(true),
    managedBy: Yup.string().nullable(true),
    isLoginEnabled: Yup.boolean().required(),
    status: Yup.number().required("Status is required"),
    comments: Yup.string().max(600).nullable(true),
  });

  const addSchema = Yup.object({
    username: Yup.string().when("isLoginEnabled", {
      is: true,
      then: () =>
        Yup.string()
          .required("Username is required")
          .matches(/^[A-Za-z]+$/, "Username must only contain letters"),
      otherwise: () => Yup.string().notRequired(),
    }),
    password: Yup.string().when("isLoginEnabled", {
      is: true,
      then: () =>
        Yup.string()
          .required("Password is required")
          .min(8, "Password must be at least 8 characters long")
          .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
          ),
      otherwise: () => Yup.string().notRequired(),
    }),
    confirmPassword: Yup.string().when("isLoginEnabled", {
      is: true,
      then: () =>
        Yup.string()
          .required("Confirm password is required")
          .oneOf([Yup.ref("password"), null], "Passwords must match"),
      otherwise: () => Yup.string().notRequired(),
    }),
  });

  const validationSchema =
    mode === "add" ? commonSchema.concat(addSchema) : commonSchema;

  const initialValues = {
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    gender: "",
    type: "",
    role: "",
    managedBy: "",
    status: 1,
    comments: "",
    isLoginEnabled: false,
    username: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values) => {
    if (!values.username) {
      values.username = undefined;
    }

    if (values && params?.mode === "add") {
      dispatch(addUser(values));
    }
    if (values && params?.mode === "edit") {
      dispatch(updateUser(params?.data?._id, values));
    }
  };

  // const handleLoginStatusToggle = (e) => {
  //   setLoginStatusToggle(e.target.checked);
  //   console.log(
  //     "🚀 ~ file: UserForm.component.jsx:146 ~ handleLoginStatusToggle ~ setLoginStatusToggle:",
  //     loginStatusToggle
  //   );
  // };

  // useEffect(() => {
  //   const handleLoginFieldValidation = () => {
  //     if (mode === "add") {
  //       if (loginStatusToggle) {
  //         setLoginFieldValidation(true);
  //       } else {
  //         setLoginFieldValidation(false);
  //       }
  //     }

  //     console.log(
  //       "🚀 ~ file: UserForm.component.jsx:155 ~ handleLoginFieldValidation ~ loginStatusToggle:",
  //       loginStatusToggle,
  //       " ",
  //       mode
  //     );
  //   };
  //   handleLoginFieldValidation();
  // }, [loginStatusToggle, mode]);

  const formatAutoCompleteData = (users) => {
    setAutocompleteLoading(true);

    let usersFormatted,
      managedByOptions = [];

    usersFormatted = users?.allData?.map((option) => {
      const firstLetter = option.firstname[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...option,
      };
    });

    if (usersFormatted) {
      managedByOptions = usersFormatted.filter(
        (user) =>
          user.role ===
          ("manager" ||
            "general-manager" ||
            "assistant-manager" ||
            "marketing-manager" ||
            "sales-manager" ||
            "operations-manager")
      );
    }

    setAutocompleteOptions({
      managedBy: managedByOptions,
    });
    setAutocompleteLoading(false);
  };

  useEffect(() => {
    formatAutoCompleteData(states?.users);
  }, [states]);

  useEffect(() => {
    const handleSuccess = () => {
      if (userState?.currentData && alertState.severity === "success") {
        const message = {
          title: alertState?.title,
          description: alertState?.description,
        };

        handleSuccessDialog(message);
      }
    };

    const handleError = () => {
      if (!userState?.data && alertState.severity === "error") {
        const message = {
          title: alertState?.title,
          description: alertState?.description,
        };
        handleErrorAlert(message);
      }
    };

    handleSuccess();
    handleError();
  }, [alertState, userState, handleErrorAlert, handleSuccessDialog, params]);

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
          "gender",
          "type",
          "role",
          "managedBy",
          "status",
          "comments",
          "username",
        ];

        fields.forEach((field) => {
          formikRef.current.setFieldValue(
            field,
            params?.data[field] ? params?.data[field] : "",
            false
          );

          if (field === "isLoginEnabled") {
            setLoginStatusToggle(params?.data[field]);
          }
        });
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
              <Grid item xs={12} md={6}>
                <FormControl>
                  <FormLabel id="gender" filled sx={{ fontSize: "0.75rem" }}>
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="gender"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    className={styles.radioGroup}
                    row
                  >
                    {genderOptions.map((item, i) => (
                      <FormControlLabel
                        key={i}
                        value={item.value}
                        control={<Radio />}
                        label={item.label}
                      />
                    ))}
                  </RadioGroup>
                  {touched.gender && Boolean(errors.gender) && (
                    <FormHelperText sx={{ ml: 0 }} error>
                      {errors.gender}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  error={touched.type && Boolean(errors.type)}
                  sx={{ height: 40 }}
                >
                  <InputLabel sx={{ ml: -1.75, mt: values?.type ? 1 : 0 }}>
                    User Type
                  </InputLabel>
                  <Select
                    fullWidth
                    id="type"
                    name="type"
                    label="Title"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="standard"
                    className={styles.textField}
                    sx={{ height: 40 }}
                  >
                    {userTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.type && Boolean(errors.type) && (
                    <FormHelperText sx={{ ml: 0 }}>
                      {touched.type && errors.type}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  error={touched.role && Boolean(errors.role)}
                  sx={{ height: 40 }}
                >
                  <InputLabel sx={{ ml: -1.75, mt: values?.role ? 1 : 0 }}>
                    User Role
                  </InputLabel>
                  <Select
                    fullWidth
                    id="role"
                    name="role"
                    label="User Type"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="standard"
                    className={styles.textField}
                    sx={{ height: 40 }}
                  >
                    {userRoleOptions.map((option) => (
                      <MenuItem key={option.slug} value={option.slug}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.role && Boolean(errors.role) && (
                    <FormHelperText sx={{ ml: 0 }}>
                      {touched.role && errors.role}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  error={touched.managedBy && Boolean(errors.managedBy)}
                  sx={{ height: 40 }}
                >
                  <InputLabel sx={{ ml: -1.75, mt: values?.managedBy ? 1 : 0 }}>
                    Reported To
                  </InputLabel>
                  <Select
                    fullWidth
                    id="managedBy"
                    name="managedBy"
                    label="Managed By"
                    value={values.managedBy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="standard"
                    className={styles.textField}
                    sx={{ height: 40 }}
                  >
                    {autocompleteOptions?.managedBy.map((option) => (
                      <MenuItem
                        key={option._id}
                        value={`${option.firstname} ${option.lastname}`}
                      >
                        {`${option.firstname} ${option.lastname}`}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.managedBy && Boolean(errors.managedBy) && (
                    <FormHelperText sx={{ ml: 0 }}>
                      {touched.managedBy && errors.managedBy}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={loginStatusToggle}
                        onChange={(e) => {
                          setFieldValue("isLoginEnabled", e.target.checked);
                          setLoginStatusToggle(e.target.checked);
                        }}
                        id="isLoginEnabled"
                        name="isLoginEnabled"
                      />
                    }
                    label="Enable Login"
                  />
                </FormGroup>
              </Grid>

              {values.isLoginEnabled && (
                <>
                  <Grid item xs={12} md={6}>
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
                      className={styles.textField}
                      size="small"
                      disabled={
                        params?.mode === "edit" && params?.data?.username !== ""
                          ? true
                          : false
                      }
                    />
                  </Grid>
                  {mode === "edit" && (
                    <Grid item xs={12}>
                      <Alert severity="info">
                        Only fill password fields if you want to change the
                        current login password
                      </Alert>
                    </Grid>
                  )}
                  <Grid item xs={12} md={6}>
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
                        autoComplete="off"
                        required
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={(e) => {
                                e.preventDefault();
                                setShowPassword(!showPassword);
                              }}
                              onMouseDown={(e) => e.preventDefault()}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {touched.password && errors.password && (
                        <FormHelperText>{errors.password}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      fullWidth
                      variant="standard"
                      error={
                        touched.confirmPassword &&
                        Boolean(errors.confirmPassword)
                      }
                      className={styles.textField}
                    >
                      <InputLabel htmlFor="confirmPassword">
                        Confirm Password
                      </InputLabel>
                      <Input
                        fullWidth
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="standard"
                        autoComplete="off"
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={(e) => {
                                e.preventDefault();
                                setShowConfirmPassword(!showConfirmPassword);
                              }}
                              onMouseDown={(e) => e.preventDefault()}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <FormHelperText>
                          {errors.confirmPassword}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </>
              )}

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
                    loading={userState?.loading}
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

export default UserForm;
