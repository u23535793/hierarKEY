import React, { useState } from 'react';
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export default function AddEmployeePopup() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    emp_num: '',
    name: '',
    surname: '',
    email: '',
    dob: '',
    position: '',
    salary: '',
    manager: '',
    editor: '',
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // You can handle the form submission here
    console.log('Submitted employee:', formData);
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Add Employee">
        <IconButton onClick={handleClickOpen}>
          <PersonAddAltIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            {[
              { name: 'emp_num', label: 'Employee Number' },
              { name: 'name', label: 'First Name' },
              { name: 'surname', label: 'Surname' },
              { name: 'email', label: 'Email' },
              { name: 'dob', label: 'Date of Birth', type: 'date' },
              { name: 'position', label: 'Position' },
              { name: 'salary', label: 'Salary', type: 'number' },
              { name: 'manager', label: 'Manager' },
              { name: 'editor', label: 'Editor' },
            ].map((field) => (
              <Grid item xs={12} sm={field.fullWidth ? 12 : 6} key={field.name}>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  label={field.label}
                  name={field.name}
                  type={field.type || 'text'}
                  value={formData[field.name]}
                  onChange={handleChange}
                  InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}