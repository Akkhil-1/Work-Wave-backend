const mongoose = require('mongoose')
const businessSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true
    },
    address :
    {
        type : String,
        required : true
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
        type : String,
        required : true
    },
    landmark :
    {
        type : String,
        required : true
    },
    businessType: {
        type: String,
        required: true
    },
    openingTime :
    {
        type : String,
        required : true
    },
    closingTime:
    {
        type : String,
        required : true
    },
    offDays:{
        type : String,
        required : true
    },
    // services: {
    //     type: Map,
    //     of: new Schema({
    //         serviceName: {
    //             type: String,
    //             required: true
    //         },
    //         duration :
    //          {
    //              type : String
    //              required: true
    //          },
    //         noOfSeats :
    //          {
    //              type : Number
    //              required: true
    //          }
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
    // businessLogo:
    // {
    //     type : String,
    // },
    // businessImages:
    // {
    //     type : [String]
    // }
    owner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
      }],
      ownerDetails: {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        email: String,
        mobile_number: Number,
        gender: String
      }
})

const Business = mongoose.model('Business' , businessSchema)

module.exports = Business