const mongoose = require('mongoose')
const bookingschema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true
    },
    serviceName: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    bookingTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Confirmed', 'Cancelled', 'Completed'],
        default: 'Pending'
    },
    customerNotes: {
        type: String,
        default: ''
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }
});

const bookingSchema = mongoose.model('bookingSchema' , bookingschema)

module.exports = bookingSchema