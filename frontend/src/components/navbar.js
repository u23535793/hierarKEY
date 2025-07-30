import React from 'react';
import { AppBar, Toolbar, Box, Button, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import PortraitIcon from '@mui/icons-material/Portrait';
import Logo from '../media/namedLogoLight.png';

export default function NavBar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box component="img" src={Logo} alt="hierarKEY Logo" sx={{ height: 60, width: 150 }} />
        <Box sx={{ flexGrow: 0.8 }} />

        <Box sx={{ display: 'flex', gap: 3, flex: 1, justifyContent: 'center' }}>
            <Button color={isActive('/dashboard') ? 'secondary' : 'background.default'} component={Link} to="/dashboard" sx={{ '&:hover': { color: 'secondary.main' } }} >
                Dashboard
            </Button>
            <Button color={isActive('/hierarchy') ? 'secondary' : 'background.default'} component={Link} to="/hierarchy" sx={{ '&:hover': { color: 'secondary.main' } }}>
                Hierarchy View
            </Button>
            <Button color={isActive('/employees') ? 'secondary' : 'background.default'} component={Link} to="/employees" sx={{ '&:hover': { color: 'secondary.main' } }}>
                Employee List
            </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flex: 1, justifyContent: 'flex-end' }}>
          <IconButton aria-label="profile" sx={{ color: isActive('/profile') ? 'secondary.main' : 'background.default', '&:hover': { color: 'secondary.main' } }} component={Link} to="/profile" >
            <PortraitIcon />
          </IconButton>
          <IconButton sx={{ color: 'background.default', '&:hover': { color: 'secondary.main' } }} component={Link} to="/profile"><LogoutIcon /></IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}