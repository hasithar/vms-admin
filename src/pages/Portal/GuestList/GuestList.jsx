import React, { useState } from "react";
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
} from "@mui/material";

const PortalGuestList = () => {
  return (
    <div>
      PortalGuestList <GuestList />
    </div>
  );
};

export default PortalGuestList;

function GuestList() {
  const [guests, setGuests] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Doe", email: "jane.doe@example.com" },
  ]);
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
  };

  const handleEditGuest = (guest) => {
    setOpen(true);
    setEditing(true);
    setCurrentGuest(guest);
  };

  const handleDeleteGuest = (id) => {
    setGuests(guests.filter((guest) => guest.id !== id));
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

  return (
    <div>
      <Button variant="contained" onClick={handleAddGuest}>
        Add Guest
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell>{guest.id}</TableCell>
                <TableCell>{guest.name}</TableCell>
                <TableCell>{guest.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleEditGuest(guest)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="outlined"
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
        <DialogTitle>{editing ? "Edit Guest" : "Add Guest"}</DialogTitle>
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
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" color="primary">
              {editing ? "Save" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
