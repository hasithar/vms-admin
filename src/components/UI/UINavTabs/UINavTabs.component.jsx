import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const UINavTabs = (props) => {
  const { categories, labelField, selected } = props;

  const [value, setValue] = useState(selected);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`../../${categories[newValue]?.slug}`);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        pr: 4,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label=""
        sx={{
          borderRight: 1,
          borderColor: "divider",
          bgcolor: "#eee",
          minWidth: 200,
          width: "100%",
        }}
      >
        {categories.map((category, i) => {
          const label = category[labelField];

          return (
            <Tab
              key={i}
              label={label}
              {...a11yProps({ i })}
              sx={{ alignItems: "flex-start" }}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default UINavTabs;
