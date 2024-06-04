const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const verified = require('../middlewares/verifyToken')

router.post('/addCategory', verified, categoryController.addCategory)
router.get('/getCategories', verified, categoryController.getCategory)
router.delete('/deleteCategory/:id', verified, categoryController.deleteCategory)

module.exports = router
