import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Paper,
  Grid,
  Box,
} from "@mui/material";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({ name: "", permissions: [] });
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [newRoleName, setNewRoleName] = useState("");
  const availablePermissions = ["Read", "Write", "Delete", "Update"];

  useEffect(() => {
    axios
      .get("http://localhost:5000/roles")
      .then((response) => setRoles(response.data))
      .catch((error) => console.error("Error fetching roles:", error));
  }, []);

  const addRole = () => {
    if (!form.name) {
      alert("Role name cannot be empty.");
      return;
    }

    axios
      .post("http://localhost:5000/roles", form)
      .then((response) => {
        setRoles([...roles, response.data]);
        setForm({ name: "", permissions: [] });
      })
      .catch((error) => console.error("Error adding role:", error));
  };

  const deleteRole = (id) => {
    axios
      .delete(`http://localhost:5000/roles/${id}`)
      .then(() => setRoles(roles.filter((role) => role.id !== id)))
      .catch((error) => {
        console.error("Error deleting role:", error);
        alert("can't delete this role");
      });
  };

  const startEditing = (id, currentName) => {
    setEditingRoleId(id);
    setNewRoleName(currentName);
  };

  const saveEdit = (id) => {
    axios
      .put(`http://localhost:5000/roles/${id}`, { name: newRoleName })
      .then(() => {
        setRoles(
          roles.map((role) =>
            role.id === id ? { ...role, name: newRoleName } : role
          )
        );
        setEditingRoleId(null);
        setNewRoleName("");
      })
      .catch((error) => {
        console.error("Error updating role:", error);
        alert("can't edit this role");
      });
  };

  const cancelEdit = () => {
    setEditingRoleId(null);
    setNewRoleName("");
  };

  const togglePermission = (permission) => {
    setForm((prevForm) => ({
      ...prevForm,
      permissions: prevForm.permissions.includes(permission)
        ? prevForm.permissions.filter((p) => p !== permission)
        : [...prevForm.permissions, permission],
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: "#ffe082", padding: { xs: 2, sm: 3 }, }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          marginBottom: 3,
          color: "#f57f17", // Primary color for heading
          fontSize: { xs: "h5.fontSize", sm: "h4.fontSize" }, // Adjust font size for responsiveness
        }}
      >
        Manage Roles
      </Typography>

      <Paper
        sx={{
          padding: { xs: 2, sm: 3 },
          marginBottom: 3,
          backgroundColor: "#fff",
          borderRadius: 8,
          boxShadow: "0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#f57f17" }}><strong>Role Name</strong></TableCell>
              <TableCell sx={{ color: "#f57f17" }}><strong>Permissions</strong></TableCell>
              <TableCell sx={{ color: "#f57f17" }}><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  {editingRoleId === role.id ? (
                    <TextField
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      fullWidth
                      sx={{ backgroundColor: "#fff" }} // White background for input field
                    />
                  ) : (
                    role.name
                  )}
                </TableCell>
                <TableCell>
                  {role.permissions && role.permissions.length > 0
                    ? role.permissions.join(", ")
                    : "No permissions assigned"}
                </TableCell>
                <TableCell>
                  {editingRoleId === role.id ? (
                    <>
                      <Button
                        color="primary"
                        onClick={() => saveEdit(role.id)}
                        sx={{
                          marginRight: 1,
                          borderRadius: 2,
                          backgroundColor: "#f57f17", // Button background color
                          "&:hover": { backgroundColor: "#f57f17" },
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        color="secondary"
                        onClick={cancelEdit}
                        sx={{
                          borderRadius: 2,
                          backgroundColor: "#f57f17", // Button background color
                          "&:hover": { backgroundColor: "#f57f17" },
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        color="primary"
                        onClick={() => startEditing(role.id, role.name)}
                        disabled={role.name === "admin" || role.name === "user"}
                        sx={{
                          marginRight: 1,
                          borderRadius: 2,
                          backgroundColor: "#f57f17", // Button background color
                          color: "#fff", // Text color for edit button
                          "&:hover": { backgroundColor: "#f57f17" },
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() => deleteRole(role.id)}
                        disabled={role.name === "admin" || role.name === "user"}
                        sx={{
                          borderRadius: 2,
                          backgroundColor: "#f57f17", // Button background color
                          color: "#fff", // Text color for delete button
                          "&:hover": { backgroundColor: "#f57f17" },
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
        Add New Role
      </Typography>

      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Role Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          fullWidth
          sx={{
            marginBottom: 2,
            backgroundColor: "#fff", // White background for input field
            borderRadius: 2,
          }}
        />

        <Typography variant="subtitle1">Select Permissions:</Typography>
        <Grid container spacing={2}>
          {availablePermissions.map((permission) => (
            <Grid item xs={6} sm={3} key={permission}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.permissions.includes(permission)}
                    onChange={() => togglePermission(permission)}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        backgroundColor: "#fff", // White background for checkbox
                      },
                    }}
                  />
                }
                label={permission}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Button
        variant="contained"
        onClick={addRole}
        sx={{
          marginTop: 3,
          borderRadius: 2,
          backgroundColor: "#f57f17", // Button background color
          color: "#fff", // Text color for add button
          "&:hover": { backgroundColor: "#f57f17" },
        }}
      >
        Add Role
      </Button>
    </Container>
  );
};

export default Roles;
