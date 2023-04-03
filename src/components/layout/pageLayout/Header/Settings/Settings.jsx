import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Typography,
  Box,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import defaultProfile from "@assets/images/default/defaultProfile.png";
import { logoutUser } from "@/features/Auth";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const userId = JSON.parse(localStorage.getItem("user"))?.data?.id;
  // const isAdmin =
  //   JSON.parse(localStorage.getItem("user"))?.data?.is_admin === 1;
  // const email = JSON.parse(localStorage.getItem("user"))?.data?.email;
  // const profileState = useSelector((state) => state.profile);
  const profileState = null;

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [profileUrl, setProfileUrl] = useState("");

  // useEffect(() => {
  //   dispatch(userActions.getUserDetails(userId));
  // }, [dispatch, userId]);

  useEffect(() => {
    setProfileUrl(profileState?.parameter?.data?.image_url);
  }, [profileState, profileUrl]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <StyledBadge
          overlap="circular"
          color="secondary"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          sx={{ position: "relative", top: "-2px", paddingLeft: "5px" }}
        >
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt="User prfile pic"
              src={profileUrl ? profileUrl : defaultProfile}
            />
          </IconButton>
        </StyledBadge>
      </Tooltip>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {/* <MenuItem>
          <Typography textAlign="center" fontWeight={"bold"}>
            {email}
          </Typography>
          <Typography textAlign="center">
            {" "}
            <span>&nbsp;</span>- {isAdmin ? "Admin" : "Customer"}
          </Typography>
        </MenuItem> */}

        {/* <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            navigate("/admin/profile");
          }}
        >
          <Typography textAlign="center">Profile</Typography>
        </MenuItem> */}

        <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            dispatch(logoutUser());
            navigate("/auth/login");
          }}
        >
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Settings;

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    // "&::after": {
    //   position: "absolute",
    //   top: 0,
    //   left: 0,
    //   width: "100%",
    //   height: "100%",
    //   borderRadius: "50%",
    //   animation: "ripple 1.2s infinite ease-in-out",
    //   border: "1px solid currentColor",
    //   content: '""',
    // },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
