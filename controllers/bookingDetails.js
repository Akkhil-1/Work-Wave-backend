// const mongoose = require("mongoose");
// const Business = require("../models/business");
// const Admin = require("../models/admin");

// const register = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       age,
//       mobile_number,
//       guest,
//       bookingDate,
//       bookingTime,
//       status,
//       customerNotes
//     } = req.body;

//     const ownerId = req.user._id;

//     // Fetch owner details
//     // const ownerDetails = await Admin.findById(ownerId).select("name email mobile_number gender");

//     // if (!ownerDetails) {
//     //   return res.status(404).json({ msg: "Owner not found" });
//     // }

//     // Create the business document with embedded owner details
//     const business = await Business.create({
//         name,
//         email,
//         age,
//         mobile_number,
//         guest,
//         bookingDate,
//         bookingTime,
//         status,
//         customerNotes
//       owner: ownerId, // Store the owner ID reference
//       ownerDetails: {
//         _id: ownerDetails._id,
//         name: ownerDetails.name,
//         email: ownerDetails.email,
//         mobile_number: ownerDetails.mobile_number,
//         gender: ownerDetails.gender,
//       },
//     });

//     res.json({
//       msg: "Business added successfully",
//       data: business, // Return the business document with embedded owner details
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       msg: "An error occurred while adding the business",
//     });
//   }
// };
// const getBusinesses = async (req, res) => {
//   try {
//     const getData = await Business.find();
//     //  change find
//     res.json({
//       status: 200,
//       msg: "Business exist",
//       data: "fetch",
//       getData,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// const updateBusiness = async (req, res) => {
//   try {
//     const id = req.params._id;
//     const update = req.body;

//     const schemaFields = Object.keys(Business.schema.paths);

//     for (const key in update) {
//       if (!schemaFields.includes(key)) {
//         return res.status(400).json({
//           status: 400,
//           msg: `Unknown field: ${key}`,
//         });
//       }
//       if (!update[key] || update[key].trim() === "") {
//         return res.status(400).json({
//           status: 400,
//           msg: `Field ${key} is missing or empty`,
//         });
//       }
//     }
//     const updateData = await Business.findByIdAndUpdate(id, update, {
//       new: true,
//       runValidators: true, //schema validation and prevent invalid data
//     });

//     res.josn({
//       status: 200,
//       msg: "Business updated",
//       data: "updated",
//       updateData,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const deleteBusiness = async (req, res) => {
//   try {
//     const id = req.params._id;
//     const deleteData = await Business.findByIdAndDelete(id);
//     if (deleteData) {
//       res.json({
//         status: 200,
//         msg: "Business deleted successfully",
//         data: deleteData,
//       });
//     } else {
//       res.json({
//         status: 404,
//         msg: "Business not found",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// module.exports = { register, getBusinesses, updateBusiness, deleteBusiness };
