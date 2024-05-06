const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const uploadController = require('../controllers/uploadFileController')
const uploader = require('../middlewares/uploaderImg')

router.get('/getUsers', userController.getUsers)
router.post('/createUser', userController.createUser)
router.post('/cloudUploadImg', uploader.cloudUpload.single('uploadImg'), uploadController.cloudUploadImg)
router.patch('/updateUser/:id', userController.updateUser)
router.delete('/deleteUser/:id', userController.deleteUserById)

module.exports = router