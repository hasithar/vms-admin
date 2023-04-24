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

const foodItems = [
  {
    title: "Pizza",
    description:
      "Classic pizza with tomato sauce, mozzarella cheese, and pepperoni",
    image: "https://images.unsplash.com/photo-1565299622719-44ec25c3a9f0",
  },
  {
    title: "Hamburger",
    description:
      "Juicy beef patty with lettuce, tomato, onion, and pickles on a sesame seed bun",
    image: "https://images.unsplash.com/photo-1610895914165-5d5fb7c5d5e5",
  },
  {
    title: "Sushi",
    description: "Assorted sushi rolls with fresh fish and vegetables",
    image: "https://images.unsplash.com/photo-1546964630-824fea62f6eb",
  },
  {
    title: "Tacos",
    description:
      "Soft or crispy tacos with seasoned beef, lettuce, tomato, and cheese",
    image: "https://images.unsplash.com/photo-1579369894219-8d7dc4d66d4e",
  },
  {
    title: "Pasta",
    description: "Spaghetti with tomato sauce, meatballs, and parmesan cheese",
    image: "https://images.unsplash.com/photo-1581091010237-0f0b88a7fe8d",
  },
  {
    title: "Burrito",
    description: "Flour tortilla stuffed with rice, beans, meat, and cheese",
    image: "https://images.unsplash.com/photo-1566155903538-d1b5f7d71f5d",
  },
  {
    title: "Chicken sandwich",
    description:
      "Grilled chicken breast with lettuce, tomato, and mayonnaise on a bun",
    image: "https://images.unsplash.com/photo-1626181544997-94da2ccf81a7",
  },
  {
    title: "Fried chicken",
    description: "Crispy fried chicken with mashed potatoes and gravy",
    image: "https://images.unsplash.com/photo-1621258363693-d3a326ab9628",
  },
  {
    title: "Pho",
    description: "Vietnamese noodle soup with beef, herbs, and spices",
    image: "https://images.unsplash.com/photo-1591614611457-6128c2e3e918",
  },
  {
    title: "Pad Thai",
    description:
      "Stir-fried rice noodles with shrimp, tofu, peanuts, and vegetables",
    image: "https://images.unsplash.com/photo-1605651562467-af58ec6f0541",
  },
];

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
