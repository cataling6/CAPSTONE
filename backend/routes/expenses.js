const express = require('express')
const router = express.Router()
const expenseController = require('../controllers/expensesController')
const verified = require('../middlewares/verifyToken')

router.post('/addExpense', expenseController.addExpense)
router.get('/getExpenses/:id', expenseController.getExpenses)
router.get('/getTotalExpenses/:id', expenseController.getTotalExpenses)
router.get('/getTotalExpenses', expenseController.getTotalExpensesForShared)
router.post('/getExpensesByDate/:id', expenseController.getExpensesByDate)
router.delete('/deleteExpense/:id', expenseController.deleteExpense)

module.exports = router