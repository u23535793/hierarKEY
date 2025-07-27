import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, IconButton, InputAdornment, FormControlLabel, Checkbox } from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; 

export default function SignUp() {
    const navigate = useNavigate(); 
    const [showPassword, setShowPassword] = useState(false);
    const [agreedToSaveData, setAgreedToSaveData] = useState(false);
    const [formData, setFormData] = useState({ organisationName: '', name: '', surname: '', email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!agreedToSaveData) {
        alert("You must agree to saving the data.");
        return;
        }

        const finalData = {
        ...formData,
        };

        console.log('Form data:', finalData);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4}}>
        <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 2, boxShadow: 2 }}>
            <Button startIcon={<ArrowBack />} onClick={() => navigate('/')}  sx={{ mb: 2 }}>Back</Button>
            <Typography variant="h4" align="center" gutterBottom>SIGN UP</Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField fullWidth label="Organisation Name" name="organisationName" value={formData.organisationName} onChange={handleChange} margin="normal" required/>

                <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required/>

                <TextField fullWidth label="Surname" name="surname" value={formData.surname} onChange={handleChange} margin="normal" required/>
                
                <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" required/>
                
                <TextField fullWidth label="Password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} margin="normal" required
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </InputAdornment>
                    ),
                    }}
                />

                <FormControlLabel control={ <Checkbox checked={agreedToSaveData} onChange={(e) => setAgreedToSaveData(e.target.checked)} required/>}
                    label="I agree to saving the data"
                />

                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, fontWeight: 'bold' }}>Sign Up</Button>
            </Box>
        </Box>
    </Container>
  );
}