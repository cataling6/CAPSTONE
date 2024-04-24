const express = require('express')
const router = express.Router()
const expenseController = require('../controllers/expensesController')

router.post('/addExpense', expenseController.addExpense)
router.get('/getExpenses', expenseController.getExpenses)
router.delete('/deleteExpense/:id', expenseController.deleteExpense)

module.exports = router