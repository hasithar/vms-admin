import React from "react";
import Page from "@/components/layout/pageLayout/Page/Page.component";
import BoxedContent from "@/components/layout/pageLayout/BoxedContent/BoxedContent.component";
import { CustomerTable } from "@/features/Admin";

const CustomersList = () => {
  const pageprops = {
    title: "Customers",
    breadcrumbs: [
      {
        title: "Customer Management",
        href: "customers",
      },
      {
        title: "All Customers",
        href: "",
      },
    ],
    widgets: {
      header: {
        search: {
          active: false,
          label: "Customer",
        },
        buttons: {
          active: true,
          links: [
            {
              type: "add",
              color: "primary",
              label: "Add New Customer",
              href: "/admin/customers/add",
            },
          ],
        },
      },
    },
  };

  return (
    <>
      <Page pageprops={pageprops}>
        <BoxedContent title="" subtitle="" description="">
          <CustomerTable />
        </BoxedContent>
      </Page>
    </>
  );
};

export default CustomersList;

// import React, { useState, useEffect } from "react";
// import { Link, useParams, useNavigate, Outlet } from "react-router-dom";
// import { Grid, Typography, Box, Stack, InputBase, Button } from "@mui/material";
// import { styled, alpha } from "@mui/material/styles";
// import Intro from "../../../components/layout/pageLayout/Intro/Intro.component";
// import Content from "../../../components/layout/pageLayout/Content/Content.component";
// import BoxedContent from "../../../components/layout/pageLayout/BoxedContent/BoxedContent.component";
// import SearchIcon from "@mui/icons-material/Search";
// import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
// import OrganizationTable from "../../../components/admin/OrganizationManagement/OrganizationTable/OrganizationTable.component";
// import { checkPermission } from "../../../helpers/helpers";

// const PageWidgets = ({ buttonLabel, searchLabel, parameter }) => {
//   const navigate = useNavigate();
//   const showCreateOrganization = checkPermission('Create Organizations');

//   return (
//     <Box>
//       <Stack
//         direction="row"
//         justifyContent="flex-end"
//         alignItems="center"
//         spacing={1}
//       >
//         <Search>
//           <SearchIconWrapper>
//             <SearchIcon />
//           </SearchIconWrapper>
//           <StyledInputBase placeholder={`Search ${searchLabel}`} />
//         </Search>
//         {showCreateOrganization &&
//         <Button
//           color="contained"
//           startIcon={<AddCircleOutlineOutlinedIcon />}
//           onClick={() => navigate("add")}
//           size="large"
//         >
//           Add New Organization
//         </Button>
//         }
//       </Stack>
//     </Box>
//   );
// };

// const OrganizationList = () => {
//   const { parameter } = useParams();

//   const breadcrumbs = [
//     <Typography key="2">Organization Management</Typography>,
//   ];

//   return (
//     <>
//       <Intro
//         pageTitle="Organization Management"
//         pageTitleShort="Organization Management"
//         breadcrumbs={breadcrumbs}
//         additionalWidgets={
//           <PageWidgets
//             buttonLabel="Organization"
//             searchLabel="Organization Management"
//             parameter={parameter}
//           />
//         }
//       />

//       <Content>
//         <Grid container spacing="2">
//           <Grid item xs={12}>
//             <BoxedContent title="All Organizations" subtitle="" description="">
//               <OrganizationTable />
//             </BoxedContent>
//           </Grid>
//         </Grid>
//       </Content>
//     </>
//   );
// };

// export default OrganizationList;
