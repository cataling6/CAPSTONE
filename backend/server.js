require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectionToDb = require('./config/db_conn');
//const path = require('path');

const PORT = 3030;
const app = express();

app.use(cors());

connectionToDb();

app.listen(PORT, () => console.log(`Server up on port ${PORT}`));