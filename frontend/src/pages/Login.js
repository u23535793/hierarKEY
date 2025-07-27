import React, { useState } from 'react';
import { Container, Box, Typography, TextField, FormControl, Button, IconButton, InputAdornment, Autocomplete } from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; 

export default function Login() {
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ organisation: '', email: '', password: '' });

  const organisations = ['OrgOne', 'OrgTwo', 'OrgThree'];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 2, boxShadow: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/')}  sx={{ mb: 2 }}>Back</Button>
        <Typography variant="h4" align="center" gutterBottom>LOGIN</Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <FormControl fullWidth margin="normal" required>
            <Autocomplete options={organisations} value={formData.organisation}
              onChange={(event, newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  organisation: newValue || '',
                }));
              }}
              renderInput={(params) => (<TextField {...params} label="Organisation" required />)}
              disableClearable
            />
          </FormControl>

          <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" required/>

          <TextField fullWidth label="Password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} margin="normal" required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, fontWeight: 'bold' }}>Login</Button>
        </Box>
      </Box>
    </Container>
  );
}