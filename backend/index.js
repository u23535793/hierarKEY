const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'https://u23535793.github.io' }));
app.use(express.json());

const orgRoute = require('./api/organisations');
const empRoute = require('./api/employees');

app.use('/organisations', orgRoute);
app.use('/employees', empRoute);

app.listen(process.env.PORT, () => console.log('Server running :)'));