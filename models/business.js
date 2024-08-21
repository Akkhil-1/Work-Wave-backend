const mongoose = require('mongoose')
const businessSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true
    },
    state :{
        type : String,
        required : true
    },
    city:{
        type : String,
        required : true
    },
    pincode:{
        type : Number,
        required : true
    },
    businessType: {
        type: String,
        required: true
    },
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Admin',
    //     required: true
    // },
    // services: {
    //     type: Map,
    //     of: new Schema({
    //         serviceName: {
    //             type: String,
    //             required: true
    //         },
    //         serviceDescription: {
    //             type: String
    //         },
    //         servicePrice: {
    //             type: Number,
    //             required: true
    //         }
    //     })
    // },
    contactEmail: {
        type: String,
        required: true,
        lowercase: true
    },
    contactPhone: {
        type: String,
        required: true,
        trim: true
    },
    openingHours: {
        type : String,
        required : true
    },
    offDays:{
        type : String,
        required : true
    },
    businessLogo:
    {
        type : String,
    },
    businessImages:
    {
        type : [String]
    }
})

const Business = mongoose.model('Business' , businessSchema)

module.exports = Business