const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
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
      type: String,
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
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    bookingDetails: [{
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      email: String
    }]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
