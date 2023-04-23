import React from "react";
import { Box, Grid } from "@mui/material";
import logo from "@assets/images/logo/logo.fullcolor.svg";
import dashboardBanner from "@assets/images/banners/portal_banner_dashboard.png";
import styles from "./PortalBanner.module.scss";

const PortalBanner = () => {
  return (
    <Box>
      <Grid container>
        <Grid item md={6}>
          <img src={logo} alt="logo" className={styles.logo} />
        </Grid>
        <Grid item md={6}></Grid>

        <Grid item md={12}>
          <img src={dashboardBanner} alt="" className={styles.cardImage} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PortalBanner;
