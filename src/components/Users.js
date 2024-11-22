import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  TextField,
  Modal,
  Box,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Users = () => {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);  // State to hold the user being edited
  const [form, setForm] = useState({ name: "", email: "", role: "", status: "" });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // Fetch users data from the API
    axios.get("http://localhost:5000/users").then((response) => setUsers(response.data));
  }, []);

  // Handle editing a user
  const handleEdit = (user) => {
    setEditUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setOpenModal(true);
  };

  // Handle saving the edited user or adding a new one
  const handleSave = () => {
    if (!editUser) {
      // If editUser is null, we are adding a new user.
      axios
        .post("http://localhost:5000/users", form)
        .then((response) => {
          setUsers([...users, response.data]);
          setOpenModal(false);  // Close the modal after saving
          setForm({ name: "", email: "", role: "", status: "" });  // Reset form
        })
        .catch((error) => console.error("Error adding user:", error));
    } else {
      // If editUser is not null, we are editing an existing user.
      axios
        .put(`http://localhost:5000/users/${editUser.id}`, form)
        .then(() => {
          const updatedUsers = users.map((user) =>
            user.id === editUser.id ? { ...user, ...form } : user
          );
          setUsers(updatedUsers);
          setOpenModal(false);  // Close modal after saving
          setEditUser(null);  // Reset the edit user
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          alert("Can't edit this user");
        });
    }
  };

  // Handle deleting a user
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        alert("Can't delete this user");
      });
  };

  // Handle modal close
  const handleCloseModal = () => {
    setOpenModal(false);
    setEditUser(null); // Reset editing user
  };

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: "#e0f7fa", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          marginBottom: 3,
          color: "#00695c", // Heading color matching the deep teal
          fontWeight: "bold",
        }}
      >
        Manage Users
      </Typography>

      {/* Add New User Button */}
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          setForm({ name: "", email: "", role: "", status: "" });
          setEditUser(null);
          setOpenModal(true);
        }}
        sx={{
          marginBottom: 3,
          borderRadius: 2,
          fontWeight: "bold",
          boxShadow: 3,
          backgroundColor: "#00695c", // Button color matching deep teal
          '&:hover': {
            backgroundColor: "#004d40", // Darker shade of deep teal on hover
          },
        }}
      >
        Add New User
      </Button>

      {/* User Cards Layout */}
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card
              sx={{
                maxWidth: 345,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "white",  // Card color set to white
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#00695c" }}  // Color of user name in the card matching deep teal
                >
                  {user.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Role:</strong> {user.role}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Status:</strong> {user.status}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleEdit(user)}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#00695c", // Primary button color
                    color: "white",
                    '&:hover': {
                      backgroundColor: "#004d40", // Darker shade on hover
                    },
                  }}
                >
                  Edit
                </Button>
                <IconButton
                  size="small"
                  color="secondary"
                  onClick={() => handleDelete(user.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit/Add User Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            padding: 4,
            backgroundColor: theme.palette.background.paper,
            maxWidth: 500,
            margin: "auto",
            marginTop: 10,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ textAlign: "center", color: "#00695c" }} // Modal heading color matching deep teal
          >
            {editUser ? "Edit User" : "Add New User"}
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />

          <TextField
            label="Name"
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            margin="normal"
            sx={{
              backgroundColor: "#e0f7fa", // Light cyan background for input
              borderRadius: 1,
            }}
          />
          <TextField
            label="Email"
            fullWidth
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            margin="normal"
            sx={{
              backgroundColor: "#e0f7fa", // Light cyan background for input
              borderRadius: 1,
            }}
          />
          <TextField
            label="Role"
            fullWidth
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            margin="normal"
            sx={{
              backgroundColor: "#e0f7fa", // Light cyan background for input
              borderRadius: 1,
            }}
          />
          <TextField
            label="Status"
            fullWidth
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            margin="normal"
            sx={{
              backgroundColor: "#e0f7fa", // Light cyan background for input
              borderRadius: 1,
            }}
          />
          <Grid container spacing={2} style={{ marginTop: 20 }}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSave}
                sx={{
                  backgroundColor: "#00695c", // Deep teal for the save button
                  fontWeight: "bold",
                  '&:hover': {
                    backgroundColor: "#004d40", // Darker teal on hover
                  },
                }}
              >
                {editUser ? "Save Changes" : "Add User"}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleCloseModal}
                sx={{
                  fontWeight: "bold",
                  borderColor: "#00695c", // Deep teal border color
                  color: "#00695c", // Deep teal text color
                  '&:hover': {
                    borderColor: "#004d40", // Darker teal border on hover
                    color: "#004d40", // Darker text color on hover
                  },
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Container>
  );
};

export default Users;
