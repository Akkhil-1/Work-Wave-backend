const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/bookingDetails')
const bookingValidate = require('../middlewares/bookingValidate')
const bookingDetailsAuth = require('../middlewares/bookingDetailsAuth')

router.post('/addbooking', bookingValidate ,  bookingController.addBooking)
router.get('/getBooking' , bookingController.getBookingDetails)
router.post('/update-booking/_:id', bookingController.updateBookingDetails)
router.post('/delete-booking/_:id' , bookingController.deleteBooking)

module.exports = router 