import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Typography, Card, CardContent, Grid } from "@mui/material";
import cardImage from "@assets/images/bg/auth_card_bg.jpg";
import logo from "@assets/images/logo/logo.fullcolor.svg";
import styles from "./PortalAuth.module.scss";

const Copyright = (props) => {
  return (
    <Typography
      variant="caption"
      color="text.caption"
      align="center"
      display="block"
      marginTop="2.4rem"
      {...props}
      className={styles.copyright}
    >
      {`Copyright ©${new Date().getFullYear()} VMS. V:${
        import.meta.env.VITE_APP_VERSION
      }`}
    </Typography>
  );
};

const PortalAuth = () => {
  return (
    <Container maxWidth={false} className={styles.wrapper}>
      <Grid container className={styles.container}>
        <Grid item md={8}>
          <img src={cardImage} alt="" className={styles.cardImage} />
        </Grid>

        <Grid item md={4} className={styles.contentWrap}>
          <img src={logo} alt="logo" className={styles.logo} />

          <Card className={styles.card}>
            <CardContent className={styles.cardContent}>
              <Grid container>
                <Grid item md={12} className={styles.outletWrapper}>
                  <Outlet />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* <Copyright /> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PortalAuth;
