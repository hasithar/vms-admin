import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Checkbox,
  Button,
  Stack,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

const MenuSet = (props) => {
  const { categoryTitle, categoryItems } = props;

  const [selectedItems, setSelectedItems] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleListItemClick = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleLogSelectedItems = () => {
    console.log(selectedItems);
    handleClick();
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="body">
          <strong>{categoryTitle}</strong>
        </Typography>
        <Box sx={{ flex: 1 }}>&nbsp;</Box>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleLogSelectedItems}
        >
          Update
        </Button>
      </Stack>

      <hr style={{ marginBottom: 0, opacity: 0.2 }} />

      <List dense className={"aaa"}>
        {categoryItems.map((item, index) => (
          <ListItem
            key={index}
            onClick={() => handleListItemClick(item)}
            sx={{ p: 0 }}
          >
            {/* <ListItemAvatar>
              <Avatar alt={item.title} src={item.image} />
            </ListItemAvatar> */}
            <ListItemText primary={item.title} secondary={item.description} />
            <Checkbox checked={selectedItems.includes(item)} color="primary" />
          </ListItem>
        ))}
      </List>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Menu selection updated
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MenuSet;
