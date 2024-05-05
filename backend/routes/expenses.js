const express = require('express')
const router = express.Router()
const expenseController = require('../controllers/expensesController')

router.post('/addExpense', expenseController.addExpense)
router.get('/getExpenses/:id', expenseController.getExpenses)
router.get('/getTotalExpenses/:id', expenseController.getTotalExpenses)
router.post('/getExpensesByDate/:id', expenseController.getExpensesByDate)
router.delete('/deleteExpense/:id', expenseController.deleteExpense)

module.exports = router