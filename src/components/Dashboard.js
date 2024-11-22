import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Grid, Box, Card, CardContent } from "@mui/material";

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: 5 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 5 }}>
        {/* Page Title */}
        <Typography variant="h3" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
          RBAC Dashboard
        </Typography>

        {/* Subtitle or description */}
        <Typography variant="h6" paragraph sx={{ fontWeight: 300 }}>
          Manage your users, roles, and permissions efficiently with this role-based access control system.
        </Typography>
      </Box>

      {/* Grid layout for Buttons */}
      <Grid container spacing={4} justifyContent="center">
        {/* Card for Manage Users */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: '#e0f7fa' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00695c' }}>
                Manage Users
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                Create, update, or delete users in the system and manage their roles.
              </Typography>
              <Button
                component={Link}
                to="/users"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  boxShadow: 2,
                  backgroundColor: '#004d40',
                  '&:hover': {
                    backgroundColor: '#00796b'
                  }
                }}
              >
                Go to Manage Users
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Card for Manage Roles */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: '#ffe082' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#f57f17' }}>
                Manage Roles
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                Assign roles to users and control their access within the system.
              </Typography>
              <Button
                component={Link}
                to="/roles"
                variant="contained"
                color="secondary"
                fullWidth
                sx={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  boxShadow: 2,
                  backgroundColor: '#f57f17',
                  '&:hover': {
                    backgroundColor: '#ffb300'
                  }
                }}
              >
                Go to Manage Roles
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Card for Manage Permissions */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: '#d1c4e9' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#673ab7' }}>
                Manage Permissions
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                Define and update permissions for users and roles.
              </Typography>
              <Button
                component={Link}
                to="/permissions"
                variant="contained"
                fullWidth
                sx={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  boxShadow: 2,
                  backgroundColor: '#512da8',
                  '&:hover': {
                    backgroundColor: '#7e57c2'
                  }
                }}
              >
                Go to Manage Permissions
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
