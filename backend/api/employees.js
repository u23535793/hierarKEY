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
        const { data: authData, error: authError } = await supabase.auth.signUp({ email, password, email_confirm: true });

        if (authError) {
            console.error('Sign up error:', authError);
            return res.status(400).json({ error: authError.message });
        }

        if (!authData || !authData.user) {
            console.error('Signup returned no user:', data);
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

module.exports = router;