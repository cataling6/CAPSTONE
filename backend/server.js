//configs:::begin
const express = require('express');
const cors = require('cors');
const connectionToDb = require('./config/db_conn');
require('dotenv').config();
//configs:::end

//routes:::begin
const usersRoute = require('./routes/users')
const loginROute = require('./routes/login')
//routes:::end
//const path = require('path');

const PORT = 3030;
const app = express();

app.use(cors());
app.use(express.json());


//routes:
app.use('/', usersRoute);
app.use('/', loginROute);


connectionToDb();

app.listen(PORT, () => console.log(`Server up on port ${PORT}`));