import React from "react";
import { Container, Box, Typography, Stack, Button } from "@mui/material";

const PortalDashboard = () => {
  return (
    <Container>
      <Box>
        <Box
          sx={{ background: "#efefef", px: 2, py: 3, mb: 0, borderRadius: 1 }}
        >
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignContent={"center"}
            alignItems={"center"}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" component={"h1"}>
                Welcome to Thotupola Lakeside Customer Portal
              </Typography>
              <Typography variant="body2">Let's plan your wedding</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default PortalDashboard;
