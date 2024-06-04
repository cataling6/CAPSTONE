const express = require('express')
const router = express.Router()
const expenseController = require('../controllers/expensesController')
const verified = require('../middlewares/verifyToken')

router.post('/addExpense', verified, expenseController.addExpense)
router.get('/getExpenses/:id', verified, expenseController.getExpenses)
router.get('/getTotalExpenses/:id', verified, expenseController.getTotalExpenses)
router.get('/getTotalExpenses', verified, expenseController.getTotalExpensesForShared)
router.post('/getExpensesByDate/:id', verified, expenseController.getExpensesByDate)
router.delete('/deleteExpense/:id', verified, expenseController.deleteExpense)

module.exports = router