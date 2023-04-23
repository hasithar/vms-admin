import React from "react";
import { Box, Grid } from "@mui/material";
import { ParameterCard } from "@/features/Admin";

import { portalLinks } from "@/constants";

const PortalNav = () => {
  return (
    <Grid container spacing={2}>
      {portalLinks.map((parameter) => (
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          lg={3}
          xl={2}
          key={parameter.id}
          sx={{
            flexBasis: { lg: "20%", xl: "16.6666%" },
            maxWidth: { lg: "20%", xl: "16.6666%" },
          }}
        >
          <ParameterCard
            title={parameter.title}
            description={parameter.description}
            icon={parameter.icon}
            slug={parameter.slug}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PortalNav;
