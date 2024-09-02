const mongoose = require("mongoose");
const Booking = require("../models/bookingDetails");
const User = require("../models/users");
const addBooking = async (req, res) => {
  try {
    const {
      name,
      email,
      age,
      mobile_number,
      guest,
      bookingDate,
      bookingTime,
      status,
      customerNotes
    } = req.body;

    // const userId = req.user._id;
    // const userDetails = await Admin.findById(userId)
    // if (!userDetails) {
    //   return res.status(404).json({ msg: "User not found" });
    // }
    const booking = await Booking.create({
        name,
        email,
        age,
        mobile_number,
        guest,
        bookingDate,
        bookingTime,
        status,
        customerNotes,
        // userDetails:{
        //     _id : userDetails._id
        // }
    });
    // Update the User with the new business details
    // await User.findByIdAndUpdate(
    //   userId,
    //   {
    //     $push: {
    //       bookingDetails: {
    //         _id: booking._id,
    //       },
    //     }
    //   },
    //   { new: true }
    // )
    res.json({
      msg: "Booking Done successfully",
      data: booking,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "An error occurred while booking",
    });
  }
};
const getBookingDetails = async (req, res) => {
  try {
    const getData = await Booking.find();
    res.json({
      status: 200,
      msg: "Bookings exist",
      data: "fetch",
      getData,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateBookingDetails = async (req, res) => {
  try {
    const id = req.params._id;
    const update = req.body;

    const schemaFields = Object.keys(Booking.schema.paths);

    for (const key in update) {
      if (!schemaFields.includes(key)) {
        return res.status(400).json({
          status: 400,
          msg: `Unknown field: ${key}`,
        });
      }
      if (!update[key] || update[key].trim() === "") {
        return res.status(400).json({
          status: 400,
          msg: `Field ${key} is missing or empty`,
        });
      }
    }
    const updateData = await Booking.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    res.josn({
      status: 200,
      msg: "Bookings updated",
      data: "updated",
      updateData,
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteBooking = async (req, res) => {
  try {
    const id = req.params._id;
    const deleteData = await Booking.findByIdAndDelete(id);
    if (deleteData) {
      res.json({
        status: 200,
        msg: "Booking deleted successfully",
        data: deleteData,
      });
    } else {
      res.json({
        status: 404,
        msg: "Booking not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { addBooking, getBookingDetails, updateBookingDetails, deleteBooking};
