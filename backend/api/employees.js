const express = require('express');
const router = express.Router();
const supabase = require('../connection/supabaseClient');

// check if email is unique
router.get('/email_exists', async (req, res) => {
    try {
        const new_email = req.query.new_email;
        const { data, error } = await supabase.rpc('exists_email', {new_email});

        if (error) {
            console.error('Error checking if email exists:', error);  
            return res.status(500).json({ error: 'Failed to check if email exists' });
        }

        res.status(200).json({ exists: data });
    } 
    catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
});

// sign up a new user
router.post('/signup', async (req, res) => {
    const { email, password, name, surname, org_id } = req.body;
    const emp_editor = true; 
    let user_id;

    try {
        const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });

        if (authError) {
            console.error('Sign up error:', authError);
            return res.status(400).json({ error: authError.message });
        }

        if (!authData || !authData.user) {
            console.error('Signup returned no user:', authData);
            return res.status(500).json({ error: 'Signup failed to return a user.' });
        }

        user_id = authData.user.id;
    } 
    catch (err) {
        console.error('Unexpected error during signup:', err);
        return res.status(500).json({ error: 'Unexpected error during signup.' });
    }

    try {
        const { error } = await supabase.rpc('signup_employee', { 
            emp_editor,
            emp_email: email, 
            emp_id: user_id,
            emp_name: name, 
            emp_surname: surname,
            emp_org_id: org_id
        });

        if (error) {
            console.error('Employee sign up  error:', error);
            return res.status(500).json({ error: 'Failed to save employee sign up data' });
        }

        res.status(201).json({ message: 'Sign up successful' });
    } 
    catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
});

// check if employee exists in the organisation 
router.get('/empl_exists', async (req, res) => {
    try {
        const emp_email = req.query.email;
        const org_name = req.query.org_name; 

        const { data, error } = await supabase.rpc('exists_empl_in_org', {emp_email, org_name});

        if (error) {
            console.error('Error checking if employee exists:', error);  
            return res.status(500).json({ error: 'Failed to check if employee exists' });
        }

        res.status(200).json({ exists: data });
    } 
    catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body; 

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            console.error('Login error:', error.message);
            return res.status(401).json({ error: 'Failed to login' });
        }

        return res.status(200).json({ user: data.user, session: data.session });
    } 
    catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}); 

// get num employees
router.get('/num_empl', async (req, res) => {
    try {
        const emp_email = req.query.email;

        const { data, error } = await supabase.rpc('num_employees', {emp_email});

        if (error) {
            console.error('Error getting number employees:', error);  
            return res.status(500).json({ error: 'Failed to get number employees' });
        }

        res.status(200).json({ data });
    } 
    catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
});

// get num managers
router.get('/num_managers', async (req, res) => {
    try {
        const emp_email = req.query.email;

        const { data, error } = await supabase.rpc('num_managers', {emp_email});

        if (error) {
            console.error('Error getting number managers:', error);  
            return res.status(500).json({ error: 'Failed to get number managers' });
        }

        res.status(200).json({ data });
    } 
    catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
});

// get num editors
router.get('/num_editors', async (req, res) => {
    try {
        const emp_email = req.query.email;

        const { data, error } = await supabase.rpc('num_editors', {emp_email});

        if (error) {
            console.error('Error getting number managers:', error);  
            return res.status(500).json({ error: 'Failed to get number managers' });
        }

        res.status(200).json({ data });
    } 
    catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
});

// get employee overview
router.get('/emp_overview', async (req, res) => {
    try {
        const emp_email = req.query.email;

        const { data, error } = await supabase.rpc('emp_overview', {emp_email});

        if (error) {
            console.error('Error getting employee overview:', error);  
            return res.status(500).json({ error: 'Failed to get employee overview' });
        }
        
        res.status(200).json(data);
    } 
    catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
});

// get employee details
router.get('/emp_details', async (req, res) => {
    try {
        const emp_email = req.query.email;

        const { data, error } = await supabase.rpc('emp_details', {emp_email});

        if (error) {
            console.error('Error getting employee details:', error);  
            return res.status(500).json({ error: 'Failed to get employee details' });
        }
        
        res.status(200).json(data);
    } 
    catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
});

// get org_id with email 
router.get('/get_org_id', async (req, res) => {
    try {
        const emp_email = req.query.email;

        const { data, error } = await supabase.rpc('get_org_id', {emp_email});

        if (error) {
            console.error('Error getting organisation ID:', error);  
            return res.status(500).json({ error: 'Failed to get organisation ID' });
        }
        
        res.status(200).json(data);
    } 
    catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
});

// add new employee
router.post('/new_empl', async (req, res) => {
    // console.log(req.body);
    const { emp_num, dob, email, password, name, surname, org_id, position, salary, manager, editor } = req.body;
    let user_id;

    try {
        const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });

        if (authError) {
            console.error('Add employee error:', authError);
            return res.status(400).json({ error: authError.message });
        }

        if (!authData || !authData.user) {
            console.error('Add employee returned no user:', authData);
            return res.status(500).json({ error: 'Add employee failed to return a user.' });
        }

        user_id = authData.user.id;
    } 
    catch (err) {
        console.error('Unexpected error during add employee:', err);
        return res.status(500).json({ error: 'Unexpected error during add employee.' });
    }

    try {
        const { error } = await supabase.rpc('add_employee', { 
            emp_dob: dob,
            emp_editor: editor,
            emp_email: email, 
            emp_id: user_id,
            emp_name: name, 
            emp_num,
            emp_pos: position,
            emp_sal: salary, 
            emp_manager: manager,
            emp_surname: surname,
            emp_org_id: org_id
        });

        if (error) {
            console.error('Add employee  error:', error);
            return res.status(500).json({ error: 'Failed to add employee' });
        }

        res.status(201).json({ message: 'Add employee successful' });
    } 
    catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
});

// check if employee is an editor 
router.get('/is_editor', async (req, res) => {
    try {
        const emp_email = req.query.email;

        const { data, error } = await supabase.rpc('is_editor', {emp_email});

        if (error) {
            console.error('Error checking if user is an editor:', error);  
            return res.status(500).json({ error: 'Failed to check if user is an editor' });
        }
        
        res.status(200).json(data);
    } 
    catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
});

// get current user details
router.get('/user_details', async (req, res) => {
    try {
        const emp_email = req.query.email;

        const { data, error } = await supabase.rpc('my_details', {emp_email});

        if (error) {
            console.error('Error getting user details:', error);  
            return res.status(500).json({ error: 'Failed to get user details' });
        }
        
        res.status(200).json(data);
    } 
    catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
});

// update employee details 
router.put('/update_user', async (req, res) => {
  const { email, name, surname, dob, empNum, position, salary, manager } = req.body;

  try {
    const { data, error } = await supabase.rpc('update_user_details', {
      _email: email,
      _name: name,
      _surname: surname,
      _dob: dob,
      _emp_num: empNum,
      _position: position,
      _salary: salary,
      _manager: manager
    });

    if (error) {
      console.error('Update user error:', error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } 
  catch (err) {
    console.error('Unexpected error during update user:', err);
    return res.status(500).json({ error: 'Unexpected error during update user.' });
  }
});

module.exports = router;