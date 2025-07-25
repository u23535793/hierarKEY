import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Grid, Container } from '@mui/material';
import Logo from "../media/namedLogo.png"

export default function Landing() {
    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>

        {/* navbar */}
        <AppBar position="static" elevation={0} sx={{ backgroundColor: 'background.default' }}>
            <Toolbar>
                <Box component="img" src={Logo} alt="hierarKEY Logo" sx={{ height: 60, width: 150, ml: 4 }}/>
                <Box sx={{ flexGrow: 1 }} />
                <Button color="primary" varient="text" sx={{fontWeight: 'bold' }}>Login</Button>
                <Button variant="contained" sx={{ ml: 2, mr: 6, backgroundColor: 'primary.main', color: 'white', fontWeight: 'bold', borderColor: 'white' }}>Sign Up</Button>
            </Toolbar>
        </AppBar>

      <Container sx={{ py: 10 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Side: Text */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Welcome to MyCompany
            </Typography>
            <Typography variant="h6" paragraph>
              Build, scale, and grow with our tools and services tailored for modern businesses.
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Get Started
            </Button>
          </Grid>

          {/* Right Side: Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={Logo}
              alt="Landing Illustration"
              sx={{ width: '100%', borderRadius: 2 }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}