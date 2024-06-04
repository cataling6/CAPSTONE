const express = require('express')
const router = express.Router()
const sharedExpenseController = require('../controllers/sharedExpenseController')
const verified = require('../middlewares/verifyToken')
//router.get('/getSharedExpenses', sharedExpenseController.getSharedExpenses)
router.get('/getMySharedExpenses/:id', verified, sharedExpenseController.getMySharedExpenses)
router.get('/getSharedExpensesWithMe/:id', verified, sharedExpenseController.getSharedExpensesWithMe)
router.post('/addSharedExpense', verified, sharedExpenseController.addSharedExpense)
router.delete('/delSharedExpense/:id', verified, sharedExpenseController.deleteSharedExpense)

module.exports = router