const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
const orgRoute = require('./routes/organisations');
const empRoute = require('./routes/employees');

app.use('/organisations', orgRoute);
app.use('/employees', empRoute);

app.listen(process.env.PORT, () => console.log('Server running :)'));