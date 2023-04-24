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
import styles from "./../styles/ReservationDetailConfirm.module.scss";
import { addCustomer, updateCustomer } from "@features/Admin";
import { titleOptions } from "@/constants/options/titleOptions";

const ReservationDetailConfirm = (props) => {
  const { params, handleSuccessDialog, handleErrorAlert } = props;
  const { states } = params;

  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer);
  const alertState = useSelector((state) => state.alert);

  const handleSubmit = (values) => {
    console.log(
      "🚀 ~ file: ReservationDetailConfirm.component.jsx:58 ~ handleSubmit ~ values:",
      values
    );
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

  return (
    <div>
      <Grid container spacing={{ xs: 2, sm: 2, md: 4 }} sx={{ pt: 0, pb: 0 }}>
        <Grid item xs={12} sx={{ mt: "-1rem" }}>
          <Alert severity="info">
            Confirm and save reservation information
          </Alert>
        </Grid>

        <Grid item md={4}>
          <Typography variant="body2">
            <strong>Wedding Date & Time</strong>
          </Typography>
        </Grid>
        <Grid item md={8} className={styles.detilCol}>
          <Typography variant="body2">Monday, 20 September 2023</Typography>
          <Typography variant="body2">Day session</Typography>
        </Grid>

        <Grid item md={4}>
          <Typography variant="body2">
            <strong>Customer</strong>
          </Typography>
        </Grid>
        <Grid item md={8} className={styles.detilCol}>
          <Typography variant="body2">Ms. Indeewari Weerakoon</Typography>
          <Typography variant="body2">52C, Union Place, Dehiwala</Typography>
        </Grid>

        <Grid item md={4}>
          <Typography variant="body2">
            <strong>Package</strong>
          </Typography>
        </Grid>
        <Grid item md={8} className={styles.detilCol}>
          <Typography variant="body2">Thotupola Bronze Package</Typography>
          <Typography variant="body2">4500 LKR Per person</Typography>
        </Grid>

        <Grid item md={4}>
          <Typography variant="body2">
            <strong>Ballroom & Pax</strong>
          </Typography>
        </Grid>
        <Grid item md={8} className={styles.detilCol}>
          <Typography variant="body2">Ballroom no. 01 </Typography>
          <Typography variant="body2">300 Pax</Typography>
        </Grid>

        <Grid item md={4}>
          <Typography variant="body2">
            <strong>Pricing</strong>
          </Typography>
        </Grid>
        <Grid item md={8} className={styles.detilCol}>
          <Typography variant="body2">
            Package price Ballroom charges Location charges Additional charges
            Tax & Service charge
          </Typography>
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
    </div>
  );
};

export default ReservationDetailConfirm;
