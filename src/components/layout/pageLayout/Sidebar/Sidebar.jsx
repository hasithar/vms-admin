import React from "react";
// import { Link as RouteLink } from "react-router-dom";
import {
  styled,
  Toolbar,
  IconButton,
  Divider,
  Stack,
  Box,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { ChevronLeftTwoTone as ChevronLeftTwoToneIcon } from "@mui/icons-material";
import Navigation from "./Navigation/Navigation";
import logo from "@assets/images/logo/logo.white.svg";
// import cardImage from "./../../../../assets/imges/backgrounds/bg_auth_card_img.jpg";

const cardImage = "";

const Sidebar = (props) => {
  const { open, toggleDrawer, theme /*drawerWidth*/ } = props;

  return (
    <Drawer variant="permanent" open={open} theme={theme}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
          background: "#6A276A",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%", py: 2 }}
        >
          <Box sx={{ width: "100%", p: 1 }}>
            <img src={logo} alt="logo" />
          </Box>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftTwoToneIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Stack>
      </Toolbar>

      <Divider light sx={{ mb: 1, borderColor: "#fff", opacity: 0.1 }} />

      <Navigation />

      <Box
        sx={{
          background: `#6A276A no-repeat url('${cardImage}') scroll bottom center / cover`,
          position: "absolute",
          left: "-20%",
          right: "-20%",
          top: "-20%",
          bottom: "-20%",
          filter: "blur(30px) brightness(90%)",
          zIndex: -1,
        }}
      />
    </Drawer>
  );
};

export default Sidebar;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: 240,
    overflow: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(0),
      [theme.breakpoints.up("lg")]: {
        width: theme.spacing(0),
      },
    }),
  },
}));
