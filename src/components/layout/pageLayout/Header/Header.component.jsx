import React from "react";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { userActions } from "../../../../actions";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Stack,
} from "@mui/material";
import {
  EmailTwoTone as EmailTwoToneIcon,
  NotificationsNoneTwoTone as NotificationsNoneTwoToneIcon,
  MenuTwoTone as MenuTwoToneIcon,
} from "@mui/icons-material";
import Clock from "react-digital-clock";
// import Search from "./Search/Search.component";
import Settings from "./Settings/Settings";
import styles from "./Header.module.scss";

const Header = (props) => {
  const { open, toggleDrawer, theme, drawerWidth } = props;

  const today = format(new Date(), "eeee, MMMM d, yyyy");

  const drawerOpen = {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.05),0px 2px 2px 0px rgba(0,0,0,0.025),0px 1px 5px 0px rgba(0,0,0,0.05)",
  };

  const drawerClose = {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.05),0px 2px 2px 0px rgba(0,0,0,0.025),0px 1px 5px 0px rgba(0,0,0,0.05)",
  };

  return (
    <AppBar
      position="absolute"
      open={open}
      elevation={2}
      sx={open ? drawerOpen : drawerClose}
    >
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
          pt: 3.5,
          pb: 3.25,
        }}
        elevation={0}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            mr: 1,
            position: "relative",
            l: "2px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuTwoToneIcon />
        </IconButton>

        {/* <Search /> */}

        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{
            flexGrow: 1,
            fontSize: "0.875rem",
            color: "primary.main",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#93693E" }}>VMS</span> Thotupola Lakeside
          <div className={styles.clock}>
            {today} &nbsp; <Clock />
          </div>
        </Typography>

        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          alignContent="center"
          spacing={2}
        >
          <IconButton color="inherit" size="small">
            <Badge badgeContent={23} color="secondary">
              <NotificationsNoneTwoToneIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit" size="small">
            <Badge badgeContent={2} color="secondary">
              <EmailTwoToneIcon />
            </Badge>
          </IconButton>

          <Settings />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
