const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.post('/addCategory', categoryController.addCategory)
router.get('/getCategories', categoryController.getCategory)
router.delete('/deleteCategory/:id', categoryController.deleteCategory)

module.exports = router
