import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; 
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material';
import { Box, Toolbar, Typography, Paper, Checkbox, IconButton, Tooltip, FormControlLabel, Switch } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Autocomplete, Button, TextField, Grid, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { visuallyHidden } from '@mui/utils';

import NavBar from '../components/navbar'; 
import { hash, getEmplDetails, isEditor } from '../requests/read';
import { addEmployee } from '../requests/create';

function AddEmployeePopup({ open, handleClose, handleSubmit, managerOptions}) {
  const [formData, setFormData] = useState({
    emp_num: '',
    name: '',
    surname: '',
    email: '',
    dob: '',
    position: '',
    salary: '',
    manager: '',
    editor: false, 
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  const handleLocalSubmit = async () => {
    const currEmail = sessionStorage.getItem('email');
    const editor = await isEditor(currEmail); 
    console.log(editor); 

    const { name, surname, email, manager } = formData;

    if (!name?.trim() || !surname?.trim() || !email?.trim()) {
      setError('Please fill in all required fields: Name, Surname, and Email.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (email.trim() === manager.trim()) {
      setError('An employee cannot be their own manager.');
      return;
    }

    setError('');

    handleSubmit(formData); 
    setFormData({ 
      emp_num: '', name: '', surname: '', email: '', dob: '',
      position: '', salary: '', manager: '', editor: false,
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Employee</DialogTitle>
      {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}
      <DialogContent>
        <Grid container spacing={2} mt={1} >
          {[
            { name: 'emp_num', label: 'Employee Number' },
            { name: 'dob', label: 'Date of Birth', type: 'date' },
            { name: 'name', label: 'First Name', required: true },
            { name: 'surname', label: 'Surname', required: true },
            { name: 'email', label: 'Email', required: true },
            { name: 'position', label: 'Position' },
            { name: 'salary', label: 'Salary', type: 'number' },
          ].map((field) => (
            <Grid item xs={12} sm={12} key={field.name}>
              <TextField
                fullWidth
                required={field.required || false}
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
          <Grid item xs={12} sm={12} sx={{ width: '45%' }}>
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
          <Grid item xs={12}>
            <FormControlLabel 
              control={
                <Checkbox
                  checked={formData.editor}
                  onChange={handleChange}
                  name="editor"
                  color="primary"
                />
              }
              label="Editor Privileges"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleLocalSubmit} variant="contained">Add</Button>
      </DialogActions>
    </Dialog>
  );
}

AddEmployeePopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  { id: 'emp_num', numeric: false, disablePadding: true, label: 'Employee Number' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'surname', numeric: false, disablePadding: true, label: 'Surname' },
  { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
  { id: 'dob', numeric: false, disablePadding: true, label: 'Date of Birth' },
  { id: 'position', numeric: false, disablePadding: true, label: 'Position' },
  { id: 'salary', numeric: false, disablePadding: true, label: 'Salary' },
  { id: 'manager', numeric: false, disablePadding: true, label: 'Manager Email' },
  { id: 'editor', numeric: false, disablePadding: true, label: 'Editor' }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all employees' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, onAddEmployeeClick } = props;
  return (
    <Toolbar sx={[ { pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, }, numSelected > 0 && {bgcolor: 'rgba(25, 118, 210, 0.12)',} ]}>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%', textAlign: 'center', p: 2, borderBottom: '3px solid #cb9043' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Employee Details List
        </Typography>        
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Employee">
            <IconButton onClick={onAddEmployeeClick}>
              <PersonAddAltIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onAddEmployeeClick: PropTypes.func.isRequired
};

export default function EmployeeList() {
  const navigate = useNavigate();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setEmployees] = useState([]);
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const handleOpenAddPopup = () => setOpenAddPopup(true);
  const handleCloseAddPopup = () => setOpenAddPopup(false);

  const handleAddEmployeeSubmit = async (newEmployeeData) => {
    const currEmail = sessionStorage.getItem('email');
    const { emp_num, dob, email, name, surname, position, salary, manager, editor} = newEmployeeData;

    const result = await addEmployee(currEmail, emp_num, dob, email, name, surname, position, salary, manager, editor);

    if (result) {
      setEmployees(prev => [...prev, { ...newEmployeeData, id: prev.length + 1 }]);
    }
  };
  
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
  
    const fetchEmployees = async () => {
      try {
        const data = await getEmplDetails(email);
        setEmployees(data.map((row, index) => ({ ...row, id: row.emp_num || index })));
      } 
      catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };
  
    authenticate(); 
    fetchEmployees();
  }, [navigate]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <NavBar />

      <Paper sx={{ width: '95%', m: 5, mx: 'auto' }}>
        <EnhancedTableToolbar numSelected={selected.length} onAddEmployeeClick={handleOpenAddPopup}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.emp_num}
                    </TableCell>
                    <TableCell align="left" padding="none">{row.name}</TableCell>
                    <TableCell align="left" padding="none">{row.surname}</TableCell>
                    <TableCell align="left" padding="none">{row.email}</TableCell>
                    <TableCell align="left" padding="none">{row.dob}</TableCell>
                    <TableCell align="left" padding="none">{row.position}</TableCell>
                    <TableCell align="left" padding="none">{row.salary}</TableCell>
                    <TableCell align="left" padding="none">{row.manager}</TableCell>
                    <TableCell align="left" padding="none">{row.editor ? 'Yes' : 'No'}</TableCell>   
                    </>               
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={4} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <FormControlLabel sx={{ ml: 1 }}
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Paper>
      <AddEmployeePopup
        open={openAddPopup}
        handleClose={handleCloseAddPopup}
        handleSubmit={handleAddEmployeeSubmit}
        managerOptions={rows.map(emp => emp.email).filter(Boolean)}
      />
    </Box>
  );
}