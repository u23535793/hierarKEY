import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Grid, Container, Stack } from '@mui/material';
import Logo from "../media/namedLogo.png"
import axios from 'axios';

export default function Landing() {
  const [organisations, setOrganisations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/organisations')
      .then(response => {
        console.log('Organisations:', response.data); 
        setOrganisations(response.data);
      })
      .catch(error => {
        console.error('Error fetching organisations:', error);
      });
  }, []);

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static" elevation={1} sx={{ backgroundColor: 'background.default' }}>
        <Toolbar>
          <Box component="img" src={Logo} alt="hierarKEY Logo" sx={{ height: 60, width: 140, ml: 4 }}/>
          <Box sx={{ flexGrow: 1 }} />
          <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button color="primary" varient="text" sx={{fontWeight: 'bold' }}>Login</Button>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ ml: 2, mr: 6, backgroundColor: 'primary.main', color: 'white', fontWeight: 'bold', borderColor: 'white' }}>Sign Up</Button>
          </Link>
        </Toolbar>
      </AppBar>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mt: 4 }}>
        <Box sx={{ flex: { xs: 'none', md: 5 }, textAlign: 'center', pt: 6, pl: 6, minWidth: 0 }}>
          <Typography variant="h1" sx={{ fontFamily: 'Playfair Display', color: '#cb9043' }}>Welcome to hierarKEY</Typography>
          <Box component="hr" sx={{ width: '250px', borderTop: '3px solid #031f2cdb', mx: 'auto', my: 2 }} />
          <Typography variant="h4" sx={{ fontFamily: 'Playfair Display', mt: 2 }}>The KEY to Smart Team Structure.</Typography>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ mt: 4, backgroundColor: 'secondary.main', color: 'primary.main', fontWeight: 'bold', borderColor: 'white', textTransform: 'none' }}>TRY NOW: structure your team today</Button>
          </Link>
        </Box>

        <Box sx={{ flex: { xs: 'none', md: 8 }, p: 2 }}>
          <Stack spacing={2} alignItems="center">
            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <Box sx={{ width: 180, height: 120, backgroundColor: 'primary.main', borderRadius: 1 }}>
                <Box component="img" src={Logo} alt="desc" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <Box sx={{ width: 180, height: 120, backgroundColor: 'primary.main', borderRadius: 1 }} />
              <Box sx={{ width: 180, height: 120, backgroundColor: 'primary.main', borderRadius: 1 }}>
                <Box component="img" src={Logo} alt="desc" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>             
            </Stack>

            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <Box sx={{ width: 180, height: 120, backgroundColor: 'primary.main', borderRadius: 1 }} />
              <Box sx={{ width: 180, height: 120, backgroundColor: 'primary.main', borderRadius: 1 }}>
                <Box component="img" src={Logo} alt="desc" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>              
              <Box sx={{ width: 180, height: 120, backgroundColor: 'primary.main', borderRadius: 1 }} />
            </Stack>

            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <Box sx={{ width: 180, height: 120, backgroundColor: 'primary.main', borderRadius: 1 }} />             
              <Box sx={{ width: 180, height: 120, backgroundColor: 'primary.main', borderRadius: 1 }} />
              <Box sx={{ width: 180, height: 120, backgroundColor: 'primary.main', borderRadius: 1 }} />    
              <Box sx={{ width: 180, height: 120, backgroundColor: 'primary.main', borderRadius: 1 }} />    
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}