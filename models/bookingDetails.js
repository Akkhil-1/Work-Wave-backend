const mongoose = require('mongoose')
const bookingschema = new mongoose.Schema({
    name :
    {
        type : String,
        required : true
    },
    email :
    {
        type : String,
        required : true,
        lowercase : true
    },
    mobile_number :
    {
        type : Number,
        required : true
    },
    guest :
    {
        type : Number,
        default : 1
    },
    location:{

    },
    serviceName: {
        type: String,
        required: true
        // dropdown for all services
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
    }
});

const bookingSchema = mongoose.model('bookingSchema' , bookingschema)

module.exports = bookingSchema
