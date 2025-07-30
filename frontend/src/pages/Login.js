import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, FormControl, Button, IconButton, InputAdornment, Autocomplete, Alert } from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; 

import { getAllOrganisations, checkEmployExistsInOrg, login } from '../requests/read';

export default function Login() {
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ organisation: '', email: '', password: '' });
  const [organisations, setOrganisations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchOrganisations() {
      const data = await getAllOrganisations(); 
      if (data) {
        setOrganisations(data); 
      }
    }
    fetchOrganisations(); 
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emplExists = await checkEmployExistsInOrg(formData.email.trim(), formData.organisation.name);
    if (!emplExists) {
      setError('Employee does not exist in this organisation.');
      return;
    }

    setError('');

    const loginData = await login(formData.email.trim(), formData.password);

    if (loginData) {
        navigate('/dashboard');
    } 
    else {
      setError('Login failed.');
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 2, boxShadow: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/')}  sx={{ mb: 2 }}>Back</Button>
        <Typography variant="h4" align="center" gutterBottom>LOGIN</Typography>

        {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit} >
          <FormControl fullWidth margin="normal" required>
            <Autocomplete 
            options={organisations.sort((a, b) => {
              if (!a.name) return 1;
              if (!b.name) return -1;
              return a.name.localeCompare(b.name);
            })}
            value={formData.organisation} 
            getOptionLabel={(option) => option?.name || ''}
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