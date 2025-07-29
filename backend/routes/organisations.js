const express = require('express');
const router = express.Router();
const supabase = require('../connection/supabaseClient');

// get all organisation names
router.get('/get', async (req, res) => {
  try {
    const { data, error } = await supabase.rpc('get_organisations');

    if (error) {
      console.error('Error fetching organisations:', error);  
      return res.status(500).json({ error: 'Failed to fetch organisations' });
    }

    res.status(200).json(data);
  } 
  catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Unexpected error occurred' });
  }
});

// check if organisation is unique
router.get('/exists', async (req, res) => {
  try {
    const new_org = req.query.name;
    const { data, error } = await supabase.rpc('exists_organisation', {new_org});

    if (error) {
      console.error('Error checking if organisation exists:', error);  
      return res.status(500).json({ error: 'Failed to check if organisation exists' });
    }

    console.log(data); 
    res.status(200).json({ exists: data });
  } 
  catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Unexpected error occurred' });
  }
});

// insert into organisation
router.post('/', async (req, res) => {
  const { org_name, org_pass } = req.body;

  try {
    const { data, error } = await supabase.rpc('insert_organisation', { org_name, org_pass });

    if (error) {
      console.error('Error inserting organisation:', error);
      return res.status(500).json({ error: 'Failed to insert organisation' });
    }

    res.status(201).json({ id: data });
  } 
  catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Unexpected error occurred' });
  }
});

module.exports = router;