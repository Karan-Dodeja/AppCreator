const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const parseFeatures = require('./routes/parseFeatures');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

app.use('/parseFeatures', parseFeatures);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
