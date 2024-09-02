const mongoose = require("mongoose");

// Define the schema for business details
const businessDetailsSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    lowercase: true,
  },
});

// Define the admin schema
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  mobile_number: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  adminBusinesses: [businessDetailsSchema],
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
