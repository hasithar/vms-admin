import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const BannerInfo = () => {
  return (
    <Box>
      <Typography>We're tying the knot!</Typography>
      <Typography>John & Jane</Typography>

      <Stack>
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
