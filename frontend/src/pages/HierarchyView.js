import React from 'react';
import { Box, Typography, Paper, CssBaseline, AppBar, Toolbar, Button, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

export default function HierarchyView() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
      <CssBaseline />

      {/* Top Navbar (repeated here, or extract to a shared component) */}
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ flex: 1 }}>
            MyDashboard
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, flex: 1, justifyContent: 'center' }}>
            <Button color="inherit" variant="outlined">Hierarchy View</Button>
            <Button color="inherit">Employee List</Button>
            <Button color="inherit">Project List</Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flex: 1, justifyContent: 'flex-end' }}>
            <Button color="inherit">Profile</Button>
            <IconButton color="inherit">
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Box sx={{ flex: 1, padding: 3, overflow: 'auto', width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Hierarchy View
        </Typography>

        <Paper elevation={2} sx={{ padding: 3, minHeight: '60vh' }}>
          {/* You can replace this with an actual tree / org chart later */}
          <Typography>This is where the organizational hierarchy or reporting structure will go.</Typography>
        </Paper>
      </Box>
    </Box>
  );
}