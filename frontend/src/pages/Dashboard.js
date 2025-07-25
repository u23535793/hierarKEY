import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Grid,
  Paper
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from "../media/namedLogo.png"

const StatBox = ({ title, value }) => (
  <Paper elevation={2} sx={{ padding: 2, textAlign: 'center' }}>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="h4">{value}</Typography>
  </Paper>
);

export default function Dashboard() {
  return (
    <>
      {/* Top Navbar */}
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box component="img" src={Logo} alt="hierarKEY Logo" sx={{ height: 60, width: 150 }}/>
          <Box sx={{ flexGrow: 0.8 }} />
          {/* Center Links */}
          <Box sx={{ display: 'flex', gap: 3, flex: 1, justifyContent: 'center' }}>
            <Button color="inherit">Hierarchy View</Button>
            <Button color="inherit">Employee List</Button>
            <Button color="inherit">Project List</Button>
          </Box>

          {/* Right-side Profile & Logout */}
          <Box sx={{ display: 'flex', gap: 2, flex: 1, justifyContent: 'flex-end' }}>
            <Button color="inherit">Profile</Button>
            <IconButton color="inherit">
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ padding: 3 }}>
        {/* Top 4 Stats */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatBox title="Users" value="120" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatBox title="Employees" value="45" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatBox title="Projects" value="9" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatBox title="TBD" value="..." />
          </Grid>
        </Grid>

        {/* Bottom Boxes */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ padding: 2, minHeight: '300px' }}>
              <Typography variant="h6" gutterBottom>
                Employee Data
              </Typography>
              <Box>Table or list of employees goes here</Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ padding: 2, minHeight: '300px' }}>
              <Typography variant="h6" gutterBottom>
                Project Info
              </Typography>
              <Box>Summary or details of projects go here</Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}