import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

export default function Profile() {
  const [formData, setFormData] = useState({
    name: 'Driya',
    surname: 'Govender',
    dob: '2000-01-01',
    email: 'driya@example.com',
    organisation: 'HierarKey',
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSave = () => {
    console.log('Saving changes:', formData);
    // Add API call or logic here
  };

  const handleDeleteAccount = () => {
    console.log('Deleting account...');
    // Add confirmation and API call here
  };

  const handleDeleteOrganisation = () => {
    console.log('Deleting organisation...');
    // Add confirmation and API call here
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
        <Grid container spacing={3}>
          {/* Avatar */}
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Avatar
              alt="User Avatar"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 100, height: 100, margin: 'auto' }}
            />
            <Typography variant="h6" mt={2}>
              {formData.name} {formData.surname}
            </Typography>
          </Grid>

          {/* Input fields */}
          <Grid item xs={12} sm={6}>
            <TextField label="Name" fullWidth value={formData.name} onChange={handleChange('name')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Surname" fullWidth value={formData.surname} onChange={handleChange('surname')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Birth"
              fullWidth
              type="date"
              value={formData.dob}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange('dob')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" fullWidth value={formData.email} onChange={handleChange('email')} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Organisation" fullWidth value={formData.organisation} onChange={handleChange('organisation')} />
          </Grid>

          {/* Action buttons */}
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Save Changes
              </Button>

              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>

              <Button
                variant="outlined"
                color="warning"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteOrganisation}
              >
                Delete Organisation
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}