import React from "react";
import { Box, Grid, Typography, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import NavigateNextTwoToneIcon from "@mui/icons-material/NavigateNextTwoTone";
import HeaderWidgets from "./HeaderWidgets/HeaderWidgets.component";
import styles from "./PageHeader.module.scss";

const PageHeader = (props) => {
  const { title, breadcrumbs, widgets } = props;

  return (
    <Box
      component="section"
      sx={{
        mb: {
          xs: 3,
          md: 4,
        },
      }}
    >
      <Grid container>
        <Grid item>
          {title && (
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: "1.2rem",
                  md: "1.4rem",
                  lg: "1.6rem",
                },
                fontWeight: 400,
              }}
            >
              {title}
            </Typography>
          )}
          {breadcrumbs.length > 0 && (
            <Breadcrumbs
              separator={<NavigateNextTwoToneIcon fontSize="small" />}
              aria-label="breadcrumb"
              className={styles.breadcrumbs}
            >
              {breadcrumbs.map((item, i) => {
                return item?.href ? (
                  <Link
                    underline="hover"
                    key={i}
                    color="inherit"
                    to={`/admin/${item?.href}`}
                  >
                    {item?.title}
                  </Link>
                ) : (
                  <Typography key={i}>{item?.title}</Typography>
                );
              })}
            </Breadcrumbs>
          )}
        </Grid>

        {widgets && (
          <Grid sx={{ flex: 1 }}>
            <HeaderWidgets widgets={widgets} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PageHeader;
