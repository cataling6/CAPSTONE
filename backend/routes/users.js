const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const uploadController = require('../controllers/uploadFileController')
const uploader = require('../middlewares/uploaderImg')
const verified = require('../middlewares/verifyToken')
const verifyBody = require('../middlewares/validateUser')

router.get('/getUsers', verified, userController.getUsers)
router.post('/createUser', verifyBody, (req, res, next) => {
    // controllo se ci sono errori di validazione che mi sono settato nel validateUsers.js
    if (req.validationErrors && req.validationErrors.length > 0) {
        return res.status(400).json({ errors: req.validationErrors });
    }
    // se non ci sono errori di validazione, passa al controller dell'utente
    next();
}, userController.createUser)
router.post('/cloudUploadImg', verified, uploader.cloudUpload.single('uploadImg'), uploadController.cloudUploadImg)
router.patch('/updateUser/:id', verified, userController.updateUser)
router.delete('/deleteUser/:id', verified, userController.deleteUserById)

module.exports = router