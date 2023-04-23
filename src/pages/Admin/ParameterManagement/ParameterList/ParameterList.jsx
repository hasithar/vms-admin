import React from "react";
import Page from "@/components/layout/pageLayout/Page/Page.component";
import BoxedContent from "@/components/layout/pageLayout/BoxedContent/BoxedContent.component";
import UINavTabs from "@/components/UI/UINavTabs/UINavTabs.component";

import { parameterTypes } from "@/constants";

import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  Stack,
  InputBase,
  Button,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
// import Intro from "../../../components/layout/pageLayout/Intro/Intro.component";
// import Content from "../../../components/layout/pageLayout/Content/Content.component";
// import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
// import NavTabs from "../../../components/common/ui/tabs/NavTabs/NavTabs.component";
// import ParameterTable from "../../../components/admin/parameterManagement/ParameterCard/ParameterTable/ParameterTable.component";

const ParameterList = () => {
  const { parameter } = useParams();
  const currentParameter = parameterTypes.filter((pt) => pt.slug === parameter);
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  const pageprops = {
    title: "Parameters",
    breadcrumbs: [
      {
        title: "Parameter Management",
        href: "parameters",
      },
      {
        title: "All Parameters",
        href: "parameters",
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
    <Page pageprops={pageprops}>
      <BoxedContent title="" subtitle="" description="" edge>
        {/* <UserTable /> */}

        {/* <Intro
          pageTitle={currentParameter[0]?.title}
          pageTitleShort={currentParameter[0]?.title}
          breadcrumbs={breadcrumbs}
          additionalWidgets={
            <PageWidgets
              buttonLabel={currentParameter[0]?.titleSingular}
              searchLabel={currentParameter[0]?.title}
              parameter={parameter}
            />
          }
        /> */}

        <Grid container spacing="2">
          {isDesktop && (
            <Grid item xs={3} xl={2}>
              {/* <UINavTabs
                categories={parameterTypes}
                selected={currentParameter[0]?.id}
                labelField="title"
              /> */}
            </Grid>
          )}

          <Grid item xs={12} lg={9} xl={10}>
            <BoxedContent
              title={currentParameter[0]?.title}
              subtitle=""
              description=""
            >
              {/* <ParameterTable parameter={currentParameter[0]} /> */}
            </BoxedContent>
          </Grid>

          {!isDesktop && (
            <Grid item xs={12}>
              <Stack
                sx={{
                  mt: 2,
                }}
              >
                <Link to="/admin/parameters" style={{ display: "block" }}>
                  <Button
                    size="medium"
                    startIcon={<ArrowBackIcon size="small" />}
                    sx={{ textTransform: "none" }}
                  >
                    Back
                  </Button>
                </Link>
              </Stack>
            </Grid>
          )}
        </Grid>
      </BoxedContent>
    </Page>
  );
};

export default ParameterList;

// import { parameterTypes } from "../../../constants";

// const PageWidgets = ({ buttonLabel, searchLabel, parameter }) => {
//   const navigate = useNavigate();

//   return (
//     <Box>
//       <Stack
//         direction="column"
//         justifyContent="flex-end"
//         spacing={0}
//         sx={{
//           mt: { xs: 3, sm: 0 },
//           ml: { sm: 3 },
//           flexDirection: { sm: "row" },
//           fontSize: "1rem",
//         }}
//       >
//         <Search>
//           <SearchIconWrapper>
//             <SearchIcon />
//           </SearchIconWrapper>
//           <StyledInputBase placeholder={`Search ${searchLabel}`} />
//         </Search>
//         <Button
//           variant="contained"
//           startIcon={<AddCircleOutlineOutlinedIcon />}
//           onClick={() => navigate("add")}
//           size="medium"
//           sx={{ mt: { xs: 1, sm: 0 } }}
//         >
//           Add New {buttonLabel}
//         </Button>
//       </Stack>
//     </Box>
//   );
// };

// const ParameterList = () => {

//   const breadcrumbs = [
//     <Link
//       underline="hover"
//       key="1"
//       color="inherit"
//       to="/admin/parameter-management"
//     >
//       Parameter Management
//     </Link>,
//     <Typography key="2">{currentParameter[0]?.title}</Typography>,
//   ];

//};

// export default ParameterList;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  transition: "all 0.3s ease-in-out",
  color: "#232323",
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.15),
  },
  "&:focus": {
    backgroundColor: alpha(theme.palette.common.black, 0.15),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    fontSize: "0.85rem",
    width: "100%",
    height: "1.85rem",
    [theme.breakpoints.up("md")]: {
      minWidth: "10rem",
    },
  },
}));
