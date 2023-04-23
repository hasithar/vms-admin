import React, { useEffect } from "react";
import { Box, Container, createTheme, useMediaQuery } from "@mui/material";
import PortalHeader from "@/components/layout/portalLayout/PortalHeader/PortalHeader.component";

const PortalLayout = ({ children }) => {
  // const isDesktop = useMediaQuery("(min-width: 1200px)");
  const mdTheme = createTheme();

  return (
    <>
      <Box>
        <PortalHeader theme={mdTheme} />

        <Box component="main">
          <Container maxWidth={false} sx={{ mt: 15, mb: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default PortalLayout;
