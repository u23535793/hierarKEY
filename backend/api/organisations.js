require('dotenv').config();
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

    res.status(200).json({ exists: data });
  } 
  catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Unexpected error occurred' });
  }
});

// insert into organisation
router.post('/insert', async (req, res) => {
  const org_name = req.body.org_name;
  const org_pass = generateStrongPassword(); 

  try {
    const { data, error } = await supabase.rpc('insert_organisation', { org_name: org_name, org_pass: org_pass });

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

//functions
function generateStrongPassword() {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const special = '!@#$%^&*()_+-=[]{}|;:<>?';
  const all = uppercase + lowercase + digits + special;

  const required = [
    uppercase[Math.floor(Math.random() * uppercase.length)],
    lowercase[Math.floor(Math.random() * lowercase.length)],
    digits[Math.floor(Math.random() * digits.length)],
    special[Math.floor(Math.random() * special.length)],
  ];

  while (required.length < 8) {
    required.push(all[Math.floor(Math.random() * all.length)]);
  }

  for (let i = required.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [required[i], required[j]] = [required[j], required[i]];
  }

  return encrypt(required.join(''));
}

const crypto = require('crypto');

function encrypt(text) {
  const cipher = crypto.createCipheriv(process.env.ALGORITHM, Buffer.from(process.env.KEY, 'hex'), Buffer.from(process.env.IV, 'hex'));
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return encrypted.toString('hex');
}

function decrypt(encrypted) {
  const decipher = crypto.createDecipheriv(process.env.ALGORITHM, Buffer.from(process.env.KEY, 'hex'), Buffer.from(process.env.IV, 'hex'));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encrypted, 'hex')), decipher.final()]);
  return decrypted.toString();
}