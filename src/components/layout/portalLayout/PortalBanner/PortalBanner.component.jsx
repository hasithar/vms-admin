import React from "react";
import { Box, Grid, Container } from "@mui/material";
import BannerInfo from "./BannerInfo.component";
import logo from "@assets/images/logo/logo.fullcolor.svg";
import dashboardBanner from "@assets/images/banners/portal_banner_dashboard.png";
import styles from "./PortalBanner.module.scss";

const PortalBanner = () => {
  return (
    <Box className={styles.wrapper}>
      <Container className={styles.container}>
        <Grid container>
          <Grid item md={6}>
            <img src={logo} alt="logo" className={styles.logo} />

            <BannerInfo />
          </Grid>
          <Grid item md={6}></Grid>
        </Grid>
      </Container>

      <img src={dashboardBanner} alt="" className={styles.bannerImage} />
    </Box>
  );
};

export default PortalBanner;
