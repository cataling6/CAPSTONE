const express = require('express')
const router = express.Router()
const sharedExpenseController = require('../controllers/sharedExpenseController')

router.post('/addSharedExpense', sharedExpenseController.addSharedExpense)