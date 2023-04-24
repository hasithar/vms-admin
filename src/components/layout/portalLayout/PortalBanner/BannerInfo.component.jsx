import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import styles from "./BannerInfo.module.scss";

const BannerInfo = () => {
  return (
    <Box className={styles.wrapper}>
      <Typography variant="body">We're tying the knot!</Typography>
      <Typography variant="h4" sx={{ fontFamily: "cinzel, serif", mt: 0.5 }}>
        Sandun & Nisha
      </Typography>

      <Stack
        direction={"row"}
        alignItems={"center"}
        className={styles.countdown}
      >
        <Typography>
          <strong>30</strong> Weeks
        </Typography>
        <FiberManualRecordIcon />
        <Typography>
          <strong>3</strong> Days
        </Typography>
        <FiberManualRecordIcon />
        <Typography>
          <strong>5</strong> Hours
        </Typography>
      </Stack>
    </Box>
  );
};

export default BannerInfo;
