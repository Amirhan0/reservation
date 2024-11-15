const express = require('express')
const router = express.Router()

const { deleteBooking,
    getAllBookings,
    createBooking,
    getBookingById, updateBooking} = require('../controller/booking-controller')

router.get('/bookings', getAllBookings);

router.post('/bookings', createBooking);

router.get('/bookings/:id', getBookingById);

router.put('/bookings/:id', updateBooking);  

router.delete('/bookings/:id', deleteBooking);

module.exports = router