const express = require('express');
const router = express.Router();
const supabase = require('../connection/supabaseClient');
const { signUp } = require('../../frontend/src/requests/create');

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

module.exports = router;