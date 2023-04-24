import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import { guestListData } from "@/constants";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

const PortalGuestList = () => {
  return (
    <Container>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component={"h1"}>
          Guest List
        </Typography>
        <Typography variant="body2">Plan and manage your guests.</Typography>
      </Box>

      <GuestList />
    </Container>
  );
};

export default PortalGuestList;

function GuestList() {
  const [guests, setGuests] = useState(guestListData);
  const [hallOccupancy, setHallOccupancy] = useState(300);
  const [numGuests, setNumGuests] = useState(0);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentGuest, setCurrentGuest] = useState({
    id: "",
    name: "",
    email: "",
  });

  const handleAddGuest = () => {
    setOpen(true);
    setEditing(false);
    setCurrentGuest({ id: "", name: "", email: "" });
    setNumGuests(numGuests + 1);
  };

  const handleEditGuest = (guest) => {
    setOpen(true);
    setEditing(true);
    setCurrentGuest(guest);
  };

  const handleDeleteGuest = (id) => {
    setGuests(guests.filter((guest) => guest.id !== id));
    setNumGuests(numGuests - 1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setCurrentGuest({
      ...currentGuest,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setGuests(
        guests.map((guest) =>
          guest.id === currentGuest.id ? currentGuest : guest
        )
      );
    } else {
      setGuests([...guests, { ...currentGuest, id: Date.now() }]);
    }
    setOpen(false);
  };

  useEffect(() => {
    setNumGuests(guests?.length);
  }, []);

  return (
    <Box>
      <Box sx={{ background: "#efefef", px: 2, py: 1, mb: 2, borderRadius: 1 }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="body2">
            No of Guests Invited: {numGuests}/{hallOccupancy}
          </Typography>
          <Button variant="contained" onClick={handleAddGuest}>
            Add Guest
          </Button>
        </Stack>
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell sx={{ textAlign: "right" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell>{guest.id}</TableCell>
                <TableCell>{guest.name}</TableCell>
                <TableCell>{guest.email}</TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    startIcon={<AddCircleOutline />}
                    onClick={() => handleEditGuest(guest)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<RemoveCircleOutline />}
                    size="small"
                    onClick={() => handleDeleteGuest(guest.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ pb: 0 }}>
          {editing ? "Edit Guest" : "Add Guest"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              fullWidth
              value={currentGuest.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email Address"
              fullWidth
              value={currentGuest.email}
              onChange={handleChange}
              sx={{ mt: 3 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="error">
              Cancel
            </Button>
            <Button
              sx={{ ml: 3 }}
              type="submit"
              variant="contained"
              color="primary"
            >
              {editing ? "Save" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
