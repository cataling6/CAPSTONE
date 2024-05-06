//configs:::begin
const express = require('express');
const cors = require('cors');
const connectionToDb = require('./config/db_conn');
require('dotenv').config();
const path = require('path')
//configs:::end

//routes:::begin
const usersRoute = require('./routes/users')
const loginRoute = require('./routes/login')
const expenseRoute = require('./routes/expenses')
const categoryRoute = require('./routes/categories')
const sharedExpenseRoute = require('./routes/sharedExpenses')
//routes:::end
//middlewares:::BEGIN
const logger = require('../backend/middlewares/logger')
//middlewares:::end

const PORT = 3030;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, './uploads')));
//routes:
app.use(logger)
app.use('/', usersRoute);
app.use('/', loginRoute);
app.use('/expenses/', expenseRoute);
app.use('/sharedExpense/', sharedExpenseRoute)
app.use('/expenses/', categoryRoute);


connectionToDb();

app.listen(PORT, () => console.log(`Server up on port ${PORT}`));