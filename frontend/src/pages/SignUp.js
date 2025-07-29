import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, IconButton, InputAdornment, FormControlLabel, Checkbox, Alert } from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; 

import { checkOrganisationExists, checkEmailExists } from '../requests/read';
import { signUp } from '../requests/create';

export default function SignUp() {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({ organisation: '', name: '', surname: '', email: '', password: '' });
    const [isOrgNameFocused, setOrgNameFocused] = useState(false);
    const [isPasswordFocused, setPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [agreedToSaveData, setAgreedToSaveData] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));

        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^[A-Za-z]+$/.test(formData.name.trim())) {
            setError('Name should only contain letters.');
            return;
        }

        if (!/^[A-Za-z]+$/.test(formData.surname.trim())) {
            setError('Surname should only contain letters.');
            return;
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(formData.password)) {
            setError('Password must be at least 8 characters and include a number, special character, uppercase and lowercase.');
            return;
        }

        const orgExists = await checkOrganisationExists(formData.organisation.trim());
        if (orgExists) {
            setError('This organisation already exists.');
            return;
        }

        const emailExists = await checkEmailExists(formData.email);
        if (emailExists) {
            setError('Email already in use.');
            return;
        }

        setError('');

        const result = await signUp(formData.organisation.trim(), formData.name.trim(), formData.surname.trim(), formData.email.trim(), formData.password); 
        if (result && result.message === 'Sign up successful') {
            navigate('/dashboard');
        } 
        else {
            setError('Signup failed:', result?.error || 'Unknown error');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4}}>
        <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 2, boxShadow: 2 }}>
            <Button startIcon={<ArrowBack />} onClick={() => navigate('/')}  sx={{ mb: 2 }}>Back</Button>
            <Typography variant="h4" align="center" gutterBottom>SIGN UP</Typography>

            {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit} >
                <TextField fullWidth label="Organisation Name" name="organisation" value={formData.organisation} onChange={handleChange} margin="normal" required
                           onFocus={() => setOrgNameFocused(true)} onBlur={() => setOrgNameFocused(false)}
                           helperText={ isOrgNameFocused ? "If the organisation has multiple locations, include the location in the name": " " } 
                />

                <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required/>

                <TextField fullWidth label="Surname" name="surname" value={formData.surname} onChange={handleChange} margin="normal" required/>
                
                <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" required/>
                
                <TextField fullWidth label="Password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} margin="normal" required
                    onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)}
                    helperText={ isPasswordFocused ? "Use at least 8 characters with letters, numbers and symbols.": " " }
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </InputAdornment>
                    )}}
                />

                <FormControlLabel control={ <Checkbox checked={agreedToSaveData} onChange={(e) => setAgreedToSaveData(e.target.checked)} required/>}
                    label="I consent to the collection and storage of personal data."
                />

                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, fontWeight: 'bold' }}>Sign Up</Button>
            </Box>
        </Box>
    </Container>
  );
}