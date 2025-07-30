import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

import NavBar from '../components/navbar'; 

export default function HierarchyView() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
      <NavBar />

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