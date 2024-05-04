const express = require('express')
const router = express.Router()
const sharedExpenseController = require('../controllers/sharedExpenseController')

//router.get('/getSharedExpenses', sharedExpenseController.getSharedExpenses)
router.get('/getMySharedExpenses/:id', sharedExpenseController.getMySharedExpenses)
router.get('/getSharedExpensesWithMe/:id', sharedExpenseController.getSharedExpensesWithMe)
router.post('/addSharedExpense', sharedExpenseController.addSharedExpense)
router.delete('/delSharedExpense/:id', sharedExpenseController.deleteSharedExpense)

module.exports = router