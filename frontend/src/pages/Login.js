import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';

export default function Login() {
  const [formData, setFormData] = useState({
    organisation: '',
    email: '',
    password: '',
  });

  const organisations = ['OrgOne', 'OrgTwo', 'OrgThree']; // Replace with actual data

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);
    // Handle login logic here
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="organisation-label">Organisation</InputLabel>
            <Select
              labelId="organisation-label"
              name="organisation"
              value={formData.organisation}
              onChange={handleChange}
              label="Organisation"
            >
              {organisations.map((org, index) => (
                <MenuItem key={index} value={org}>
                  {org}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, fontWeight: 'bold' }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};