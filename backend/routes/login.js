const express = require('express')
const login = express.Router()
const loginController = require('../controllers/loginController')

login.post('/login', loginController.login)

module.exports = login;