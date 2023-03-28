import React from "react";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { userActions } from "../../../../actions";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
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

import Search from "./Search/Search.component";
import Settings from "./Settings/Settings";

const Header = (props) => {
  const { open, toggleDrawer, theme, drawerWidth } = props;

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

        <Search />

        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        ></Typography>

        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={1}
        >
          <IconButton color="inherit">
            <Badge badgeContent={23} color="secondary">
              <NotificationsNoneTwoToneIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit">
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
