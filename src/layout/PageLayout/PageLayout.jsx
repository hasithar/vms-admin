import React, { useEffect } from "react";
import { Box, Container, createTheme, useMediaQuery } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Header from "@/components/layout/pageLayout/Header/Header.component";
import Sidebar from "@/components/layout/pageLayout/Sidebar/Sidebar";

const PageLayout = ({ children }) => {
  const [open, setOpen] = React.useState(true);
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  const drawerWidth = 240;
  const mdTheme = createTheme();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const setDrawer = () => {
      isDesktop ? setOpen(true) : setOpen(false);
    };

    setDrawer();
  }, [isDesktop]);

  return (
    <>
      <Box sx={{ display: "flex", overflowX: "hidden" }}>
        <Header
          open={open}
          toggleDrawer={toggleDrawer}
          theme={mdTheme}
          drawerWidth={drawerWidth}
        />

        <Sidebar
          open={open}
          toggleDrawer={toggleDrawer}
          theme={mdTheme}
          drawerWidth={drawerWidth}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: "100vh",
            overflow: "auto",
            ...(open ? { pl: 0 } : { pl: 0 }),
          }}
        >
          <Container maxWidth={false} sx={{ mt: 15, mb: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {children}
            </LocalizationProvider>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default PageLayout;
