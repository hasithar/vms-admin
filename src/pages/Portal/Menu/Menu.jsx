import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Checkbox,
  Button,
} from "@mui/material";
// import foodItems from './foodItems'; // assume an array of 10 food items with properties "title", "description", "image"

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

const PortalMenu = () => {
  const [selectedItems, setSelectedItems] = useState([]);

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
  };

  return (
    <div>
      PortalMenu
      <List className={"aaa"}>
        {foodItems.map((item, index) => (
          <ListItem key={index} onClick={() => handleListItemClick(item)}>
            <ListItemAvatar>
              <Avatar alt={item.title} src={item.image} />
            </ListItemAvatar>
            <ListItemText primary={item.title} secondary={item.description} />
            <Checkbox checked={selectedItems.includes(item)} color="primary" />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogSelectedItems}
      >
        Log selected items
      </Button>
    </div>
  );
};

export default PortalMenu;
