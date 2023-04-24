import React, { useState } from "react";
import { Button, Container, Box, Typography, Stack, Grid } from "@mui/material";
import MenuSet from "./MenuSet.component";

const menuItems = [
  {
    type: "salad",
    title: "Salads",
    titleSingular: "Salad",
    items: [
      {
        title: "Cream of Chicken ",
        description: "",
        image: "",
      },
      {
        title: "Vegetable Broth ",
        description: "",
        image: "",
      },
      {
        title: "Sweet Corn & Egg Drop ",
        description: "",
        image: "",
      },
      {
        title: "Cream of Mushroom ",
        description: "",
        image: "",
      },
      {
        title: "Cream of Vegetable",
        description: "",
        image: "",
      },
      {
        title: "Seafood Broth",
        description: "",
        image: "",
      },
      {
        title: "Cream of Tomato",
        description: "",
        image: "",
      },
      {
        title: "Seafood Chowder",
        description: "",
        image: "",
      },
    ],
  },
];

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

      <Grid container>
        <Grid item md={4}>
          {menuItems.map((category) => (
            <MenuSet
              key={category?.type}
              categoryTitle={category?.title}
              categoryItems={category?.items}
            />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PortalMenu;
