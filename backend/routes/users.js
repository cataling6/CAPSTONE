const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/getUsers', userController.getUsers)
router.post('/createUser', userController.createUser)
router.delete('/deleteUser/:id', userController.deleteUserById)

module.exports = router