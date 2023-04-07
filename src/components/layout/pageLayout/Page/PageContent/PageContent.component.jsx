import React from "react";
import { Box, Grid } from "@mui/material";

const PageContent = (props) => {
  return (
    <Box
      component="article"
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
      }}
    >
      <Grid container spacing="2">
        <Grid item xs={12}>
          {props.content}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageContent;
