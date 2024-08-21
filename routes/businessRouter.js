const express = require('express')
const router = express.Router()
const businessController = require('../controllers/businessController')
const validateBusiness = require('../middlewares/businessValidation')

router.post('/addbusiness' , validateBusiness , businessController.register)
router.get('/getBusiness' , businessController.getBusinesses)
router.post('/update-business/_:id', businessController.updateBusiness)
router.post('/delete-business/_:id' , businessController.deleteBusiness)

module.exports = router