const express = require('express')
const router = express.Router();
const cronjobController = require('../controllers/cronjobRenderController')

router.post('/addNewCronjob', cronjobController.addCronjob)
router.get('/getCronjobs', cronjobController.getCronjob)

module.exports = router