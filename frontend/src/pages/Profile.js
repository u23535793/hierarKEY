import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Avatar, Button, Grid, Paper, TextField, Stack, Typography, Box, Alert, Autocomplete } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import PasswordIcon from '@mui/icons-material/Password';

import NavBar from '../components/navbar'; 
import { hash, getUserDetails, getOrgID, getOrgAccess, getEmplOverview} from '../requests/read';
import { updateUserDetails } from '../requests/update';

export default function Profile() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [managerOptions, setManagerOptions] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    dob: '',
    email: '',
    password: '', 
    empNum: '', 
    position: '',
    salary: '',
    manager: '', 
  });

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    const access = sessionStorage.getItem('access');
    
    const authenticate = async () => { 
      if (!email || !access) {
        sessionStorage.clear();
        navigate('/');
        return;
      }
    
      try {
        const check = await hash(email); 
          if (access !== check) {
            sessionStorage.clear();
            navigate('/');
            return; 
          } 
        }
      catch (error) {
        console.error('Authentication failed:', error);
      }
    }
    
    const fetchUserData = async () => {
      try {
        const userDetails = await getUserDetails(email);
        if (userDetails) {
          setFormData({
            name: userDetails[0].name || '',
            surname: userDetails[0].surname || '',
            dob: userDetails[0].dob || '',
            email: userDetails[0].email || '',
            password: '', 
            empNum: userDetails[0].emp_num || '', 
            position: userDetails[0].position || '',
            salary: userDetails[0].salary || '',
            manager: userDetails[0].manager || '', 
          });
        }
      }
      catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    }

    const fetchManagers = async () => {
      try {
        const data = await getEmplOverview(email);
        const managers = data
          .map(emp => emp.email)
          .filter(email => email && email.length > 0);
        setManagerOptions(managers);
      } 
      catch (error) {
        console.error('Failed to fetch manager options:', error);
      }
    };

    authenticate(); 
    fetchUserData();
    fetchManagers();
  }, [navigate]);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
    if (error) setError('');
  };

  const [open, setOpen] = useState(false);
  const [orgAccessData, setOrgAccessData] = useState(null);
  const handleOrgPassword = async() => {
    const org_id = await getOrgID(sessionStorage.getItem('email'));
    const access = await getOrgAccess(org_id);
    setOrgAccessData(access);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOrgAccessData(null);
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.surname.trim()) {
      setError('Name and Surname are required.');
      return;
    }

    if (formData.email.trim() === formData.manager.trim()) {
      setError('An employee cannot be their own manager.');
      return;
    }

    if (error) setError('');

    // console.log('Saving changes:', formData);
    const result = await updateUserDetails(formData);
    if (!result?.success) {
      setError('Update failed');
    }
    
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
    <>
      <NavBar />

      <Paper elevation={3} sx={{ padding: 3, maxWidth: '60%', mt: 4, mx: 'auto' }}>
        {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Avatar
              alt="User Avatar"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 100, height: 100, margin: 'auto' }}
            />
          </Grid>
        <Typography variant="body1" sx={{ mt: 4, width: '100%', textAlign: 'center', color: 'primary.main'}}>PERSONAL DETAILS</Typography>
        <Grid container spacing={3} justifyContent='space-evenly'>
          <Grid container spacing={3} >
            <Grid item xs={12} sm={6} mt={3}>
              <TextField label="Name" fullWidth value={formData.name} onChange={handleChange('name')} />
            </Grid>
            <Grid item xs={12} sm={6} mt={3}>
              <TextField label="Surname" fullWidth value={formData.surname} onChange={handleChange('surname')} />
            </Grid>
            <Grid item xs={12} sm={6} mt={3}>
              <TextField label="Date of Birth" fullWidth type="date" value={formData.dob} InputLabelProps={{ shrink: true }} onChange={handleChange('dob')}/>
            </Grid>
          </Grid>
          <Box component="hr" sx={{ width: '250px', borderTop: '3px solid #cb9043', mx: 'auto', mt: 1}} />
          <Typography variant="body1" sx={{ width: '100%', textAlign: 'center', color: 'primary.main'}}>EMPLOYEE DETAILS</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} >
              <TextField label="Email" fullWidth value={formData.email} onChange={handleChange('email')} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Password" fullWidth onChange={handleChange('password')} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Employee Number" fullWidth value={formData.organisation} onChange={handleChange('empNum')} />
            </Grid>
          </Grid>
          <Grid container spacing={3} justifyContent='space-between' sx={{ width: '76%' }}>
            <Grid item xs={12}>
              <TextField label="Position" fullWidth value={formData.position} onChange={handleChange('position')} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Salary" fullWidth value={formData.salary} onChange={handleChange('salary')} />
            </Grid>
            <Grid item xs={12} sx={{ width: '30%', mt: -1}}>
              {/* <TextField label="Manager Email" fullWidth value={formData.manager} onChange={handleChange('manager')} /> */}
              <Autocomplete
                fullWidth
                options={managerOptions}
                getOptionLabel={(option) => option}
                value={formData.manager}
                onChange={(event, newValue) => {
                  setFormData(prev => ({ ...prev, manager: newValue || '' }));
                  if (error) setError('');
                }}
                renderInput={(params) => (
                  <TextField              
                    {...params}
                    label="Manager Email"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                )}
                freeSolo
                clearOnEscape
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<PasswordIcon />}
                  onClick={handleOrgPassword}
                >
                  Organisation Password
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Organisation Access</DialogTitle>
                  <DialogContent>
                    {orgAccessData ? (
                      <>
                        <Typography variant="body1">
                          <strong>Password:</strong> {orgAccessData}
                        </Typography>
                      </>
                    ) : (
                      <Typography>Loading...</Typography>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                  </DialogActions>
                </Dialog>
              </>

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
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteOrganisation}
              >
                Delete Organisation
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}