import React, { useEffect } from "react";
import { Box, Container, createTheme, useMediaQuery } from "@mui/material";
import PortalHeader from "@/components/layout/portalLayout/PortalHeader/PortalHeader.component";
import PortalBanner from "@/components/layout/portalLayout/PortalBanner/PortalBanner.component";
import PortalNav from "@/components/layout/portalLayout/PortalNav/PortalNav.component";

const PortalLayout = ({ children }) => {
  // const isDesktop = useMediaQuery("(min-width: 1200px)");
  const mdTheme = createTheme();

  return (
    <>
      <Box>
        <PortalHeader theme={mdTheme} />

        <PortalBanner />

        <PortalNav />

        <Box component="main">
          <Container maxWidth={false} sx={{ mt: 5, mb: 5 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default PortalLayout;
