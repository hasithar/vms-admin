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
  Checkbox,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { guestListData } from "@/constants";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";

const PortalFunctionPlan = () => {
  return (
    <Container>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component={"h1"}>
          Function Plan
        </Typography>
        <Typography variant="body2">
          Plan and manage your wedding day activities
        </Typography>
      </Box>

      <SimpleToDoList />
    </Container>
  );
};

export default PortalFunctionPlan;

const SimpleToDoList = () => {
  const [tasks, setTasks] = useState([
    {
      title: "Finalizing the wedding package",
      description: "",
    },
    {
      title: "Finalizing the wedding menu",
      description:
        "Deciding on the menu including inclusions, exclusions and additional requests",
    },
    {
      title: "Finalizing the pax count",
      description: "",
    },
    {
      title: "Inviting guests and sending out invitations",
      description: "",
    },
    {
      title: "Finalizing the wedding attire",
      description:
        "Choosing the wedding attire for the bride, groom, and wedding party",
    },
    {
      title: "Selecting a wedding cake",
      description: "",
    },
    {
      title: "Finalizing music",
      description: "Booking a DJ or live music for the reception",
    },
    {
      title: "Finalizing traditional Sri Lankan drum troupe ",
      description:
        "Hiring or requesting traditional Sri Lankan drum troupe to perform at the wedding",
    },
    {
      title: "Finalizing a hair and makeup artist",
      description:
        "Finding a professional hair and makeup artist for the bride and bridal party",
    },
    {
      title: "Finalizing the wedding flowers",
      description: "Selecting and ordering the wedding flowers",
    },
    {
      title: "Finalizing the wedding decorations",
      description: "Selecting and ordering the wedding decorations",
    },
    {
      title: "Finalizinng transportation",
      description: "Organizing transportation for the wedding party and guests",
    },

    {
      title: "Arranging for the wedding favors and gifts for guests",
      description: "",
    },
    {
      title: "Poruwa preparation",
      description:
        "Provide finalized details with auspecious times to preparing for the traditional poruwa ceremony",
    },
  ]);

  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const handleNewTaskChange = (event) => {
    setNewTask({ ...newTask, [event.target.name]: event.target.value });
  };

  const handleAddTask = () => {
    if (newTask.title !== "") {
      setTasks([...tasks, newTask]);
      setNewTask({ title: "", description: "" });
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleToggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <Box>
      <Box sx={{ background: "#efefef", px: 2, py: 1, mb: 2, borderRadius: 1 }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="body2">Add New Task</Typography>
          <Box>
            <TextField
              label="Task Title"
              name="title"
              size="small"
              value={newTask.title}
              onChange={handleNewTaskChange}
              sx={{ ml: 1 }}
            />
            <TextField
              label="Task Description"
              name="description"
              size="small"
              value={newTask.description}
              onChange={handleNewTaskChange}
              sx={{ ml: 1, mr: 1 }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddTask}
            >
              Add Task
            </Button>
          </Box>
          <Box sx={{ flex: 1 }}>&nbsp;</Box>
          <Button variant="contained" color="primary" onClick={handleAddTask}>
            Save Function Plan
          </Button>
        </Stack>
      </Box>

      <List>
        {tasks.map((task, index) => (
          <ListItem key={index} button onClick={() => handleToggleTask(index)}>
            <Checkbox checked={task.completed} />
            <ListItemText primary={task.title} secondary={task.description} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteTask(index)}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
