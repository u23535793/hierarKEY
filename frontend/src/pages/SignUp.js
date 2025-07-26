import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';

export default function SignUp() {
    const [formData, setFormData] = useState({
        organisationName: '',
        name: '',
        surname: '',
        email: '',
        dob: '',
        password: '',
        employeeNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Add form validation and submission logic
        console.log('Form data:', formData);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4}}>
        <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h4" gutterBottom>
            Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
            fullWidth
            label="Organisation Name"
            name="organisationName"
            value={formData.organisationName}
            onChange={handleChange}
            margin="normal"
            required
            />
            <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
            />
            <TextField
            fullWidth
            label="Surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            margin="normal"
            required
            />
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
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
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
            <TextField
            fullWidth
            label="Employee Number"
            name="employeeNumber"
            value={formData.employeeNumber}
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
            Sign Up
            </Button>
        </Box>
        </Box>
        </Container>
    );
}