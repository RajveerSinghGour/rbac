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
  Checkbox,
  Button,
  TextField,
  Paper,
  Box,
} from "@mui/material";

const Permissions = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState(["Read", "Write", "Delete", "Update"]);
  const [newPermission, setNewPermission] = useState(""); // For adding new permissions

  useEffect(() => {
    axios
      .get("http://localhost:5000/roles")
      .then((response) => {
        const updatedRoles = response.data.map((role) => ({
          ...role,
          permissions: role.permissions || [], // Default to empty array if permissions are undefined
        }));
        setRoles(updatedRoles);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  }, []);

  const togglePermission = (roleId, permission) => {
    const role = roles.find((r) => r.id === roleId);
    if (role.name === "User" || role.name === "Admin") {
      return; // Prevent modification if the role is User or Admin
    }

    const updatedRoles = roles.map((role) => {
      if (role.id === roleId) {
        const newPermissions = role.permissions.includes(permission)
          ? role.permissions.filter((p) => p !== permission)
          : [...role.permissions, permission];
        return { ...role, permissions: newPermissions };
      }
      return role;
    });

    setRoles(updatedRoles);

    const updatedRole = updatedRoles.find((role) => role.id === roleId);
    axios.put(`http://localhost:5000/roles/${roleId}`, updatedRole);
  };

  const addPermission = () => {
    if (newPermission && !permissions.includes(newPermission)) {
      setPermissions([...permissions, newPermission]);
      setNewPermission("");

      axios
        .post("http://localhost:5000/permissions", { name: newPermission })
        .catch((error) => {
          console.error("Error adding permission:", error);
        });
    } else {
      alert("Permission already exists or is empty.");
    }
  };

  const deletePermission = (permissionToDelete) => {
    setPermissions(permissions.filter((permission) => permission !== permissionToDelete));

    axios
      .delete(`http://localhost:5000/permissions/${permissionToDelete}`)
      .catch((error) => {
        console.error("Error deleting permission:", error);
      });

    const updatedRoles = roles.map((role) => {
      const newPermissions = role.permissions.filter(
        (permission) => permission !== permissionToDelete
      );
      return { ...role, permissions: newPermissions };
    });

    setRoles(updatedRoles);

    updatedRoles.forEach((role) => {
      axios
        .put(`http://localhost:5000/roles/${role.id}`, role)
        .catch((error) => {
          console.error("Error updating role after permission deletion:", error);
        });
    });
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 3, backgroundColor: "#f3e5f5" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          color: "#512da8", // Darker purple for the heading
          fontWeight: "bold",
        }}
      >
        Manage Permissions
      </Typography>

      {/* Add New Permission Section */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: "#512da8", // Darker purple for subheadings
            marginBottom: 2,
          }}
        >
          Add New Permission
        </Typography>
        <TextField
          label="New Permission"
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            backgroundColor: "#ffffff", // White background for the input field
            borderRadius: 2,
          }}
        />
        <Button
          variant="contained"
          onClick={addPermission}
          sx={{
            backgroundColor: "#673ab7", // Purple button
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#512da8", // Darker purple on hover
            },
            marginTop: 2,
            borderRadius: 2,
          }}
        >
          Add Permission
        </Button>
      </Box>

      {/* Permissions Table */}
      <Paper sx={{ padding: 2, backgroundColor: "#fff", borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#512da8" }}>Role Name</TableCell>
              {permissions.map((permission) => (
                <TableCell
                  key={permission}
                  sx={{ fontWeight: "bold", color: "#512da8" }}
                >
                  {permission}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                {permissions.map((permission) => (
                  <TableCell key={permission}>
                    <Checkbox
                      checked={role.permissions.includes(permission)}
                      onChange={() => togglePermission(role.id, permission)}
                      disabled={role.name === "User" || role.name === "Admin"}
                      sx={{
                        color: "#673ab7", // Purple color for checkboxes
                        "&.Mui-checked": {
                          color: "#512da8", // Darker purple for checked checkboxes
                        },
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Delete Permission Section */}
<Box sx={{ marginTop: 3 }}>
  <Typography
    variant="h6"
    gutterBottom
    sx={{
      color: "#512da8", // Darker purple for subheadings
      marginBottom: 2,
      fontWeight: "bold",
    }}
  >
    Delete Permission
  </Typography>

  {permissions.length > 0 ? (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {permissions.map((permission) => (
        <Box
          key={permission}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            backgroundColor: "#ffffff", // White background for each permission item
            borderRadius: 2,
            boxShadow: 1,
            transition: "box-shadow 0.3s ease, background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#f3e5f5", // Light purple on hover
              boxShadow: 3,
            },
          }}
        >
          <Typography sx={{ color: "#512da8", fontWeight: "bold" }}>
            {permission}
          </Typography>
          <Button
            color="secondary"
            onClick={() => deletePermission(permission)}
            sx={{
              backgroundColor: "#e57373", // Light red for delete button
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#f44336", // Red on hover
              },
              padding: "6px 16px",
              borderRadius: 2,
            }}
          >
            Delete
          </Button>
        </Box>
      ))}
    </Box>
  ) : (
    <Typography sx={{ color: "#512da8" }}>No permissions to delete.</Typography>
  )}
</Box>

    </Container>
  );
};

export default Permissions;
