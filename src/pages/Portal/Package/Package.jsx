import React from "react";
import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
  Alert,
} from "@mui/material";

const PortalPackage = () => {
  return (
    <Container>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component={"h1"}>
          Package
        </Typography>
        <Typography variant="body2">
          Plan and manage your wedding package
        </Typography>
      </Box>

      <Box>
        <Box
          sx={{ background: "#efefef", px: 2, py: 1, mb: 0, borderRadius: 1 }}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignContent={"center"}
            alignItems={"center"}
          >
            <Alert severity="info">
              Please contact your dedicated customer agent or contact our
              hotline through <strong>0777 352372</strong> regarding any package
              changes.
            </Alert>
            <Box sx={{ flex: 1 }}>&nbsp;</Box>
            <Button variant="contained" color="secondary">
              Inquire
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default PortalPackage;
