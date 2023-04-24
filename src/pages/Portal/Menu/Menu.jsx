import React, { useState } from "react";
import { Button, Container, Box, Typography, Stack, Grid } from "@mui/material";
import MenuSet from "./MenuSet.component";

import { menuItemsData } from "@/constants";

const PortalMenu = () => {
  return (
    <Container>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component={"h1"}>
          Menu
        </Typography>
        <Typography variant="body2">
          Plan and manage your wedding menu
        </Typography>
      </Box>

      <Box sx={{ background: "#efefef", px: 2, py: 1, mb: 2, borderRadius: 1 }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="body2">
            Selected Menu: <strong>Thotupola Platinum Menu</strong>
          </Typography>
          <Box sx={{ flex: 1 }}>&nbsp;</Box>
          <Button variant="contained" color="primary" onClick={() => {}}>
            Save Menu Selection
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={10}>
        {menuItemsData.map((category) => (
          <Grid item md={4} key={category?.type}>
            <MenuSet
              categoryTitle={category?.title}
              categoryItems={category?.items}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PortalMenu;
