import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, InputBase, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import {
  Search as SearchIcon,
  AddCircleOutlineOutlined as AddCircleIcon,
} from "@mui/icons-material";
import UIStepper from "@/components/UI/UIStepper/UIStepper.component";

const HeaderWidgets = (props) => {
  const { widgets } = props;
  const { search, buttons, stepper } = widgets;

  const navigate = useNavigate();

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={1}
      >
        {search?.active && (
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder={`Search ${search?.label}`} />
          </Search>
        )}

        {buttons?.active &&
          buttons?.links?.map((item) => (
            <Button
              key={item?.label}
              variant="contained"
              startIcon={item?.type === "add" ? <AddCircleIcon /> : null}
              onClick={() => navigate(item?.href)}
              size="medium"
              color={item?.color ? item?.color : "primary"}
              sx={{ fontSize: "0.8rem", px: "0.9rem", py: "0.6rem" }}
            >
              {item?.label}
            </Button>
          ))}

        {stepper?.active && (
          <UIStepper activeStep={stepper?.activeStep} steps={stepper?.steps} />
        )}
      </Stack>
    </Box>
  );
};

export default HeaderWidgets;

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
    fontSize: "0.8rem",
    width: "100%",
    height: "1.625rem",
    [theme.breakpoints.up("md")]: {
      minWidth: "10rem",
    },
  },
}));

// const PageWidgets = ({ buttonLabel, searchLabel, parameter }) => {
//   const navigate = useNavigate();
//   const showCreateOrganization = checkPermission('Create Organizations');
