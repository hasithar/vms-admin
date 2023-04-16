import React from "react";
import { Grid } from "@mui/material";
import Page from "@/components/layout/pageLayout/Page/Page.component";
import BoxedContent from "@/components/layout/pageLayout/BoxedContent/BoxedContent.component";
import { ParameterCard } from "@/features/Admin";

import { parameterTypes } from "@/constants";

const ParameterManagement = () => {
  const pageprops = {
    title: "Parameters",
    breadcrumbs: [
      {
        title: "Parameter Management",
        href: "parameters",
      },
      {
        title: "All Parameters",
        href: "",
      },
    ],
    widgets: {
      header: {
        search: {
          active: false,
          label: "Parameter",
        },
        buttons: {
          active: false,
          links: [],
        },
      },
    },
  };

  return (
    <>
      <Page pageprops={pageprops}>
        <BoxedContent title="" subtitle="" description="">
          <Grid container spacing={2} sx={{ mt: -3 }}>
            {parameterTypes.map((parameter) => (
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
        </BoxedContent>
      </Page>
    </>
  );
};

export default ParameterManagement;

// import React from "react";

// import Intro from "../../../components/layout/pageLayout/Intro/Intro.component";
// import Content from "../../../components/layout/pageLayout/Content/Content.component";
// import BoxedContent from "../../../components/layout/pageLayout/BoxedContent/BoxedContent.component";
// import ParameterCard from "../../../components/admin/parameterManagement/ParameterCard/ParameterCard.component";

// import { parameterTypes } from "../../../constants";

// const ParamaeterManagementHome = () => {
//   const breadcrumbs = [<Typography key="3">Parameter Management</Typography>];

//   return (
//     <>
//       <Intro
//         pageTitle={`Parameter Management`}
//         pageTitleShort="Parameter Management"
//         breadcrumbs={breadcrumbs}
//         additionalWidgets=""
//       />

//       <Content>
//         <BoxedContent title="Select an option" subtitle="" description="">

//         </BoxedContent>
//       </Content>
//     </>
//   );
// };

// export default ParamaeterManagementHome;
