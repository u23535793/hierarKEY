const express = require('express');
const router = express.Router();
const supabase = require('../connection/supabaseClient');

// check if email is unique
router.get('/', async (req, res) => {
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

module.exports = router;