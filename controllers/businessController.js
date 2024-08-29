const Business = require("../models/business");
const register = async (req, res) => {
  try {
    const {
      businessName,
      Address,
      state,
      city,
      Landmark,
      pincode,
      businessType,
      contactEmail,
      contactPhone,
      openingHours,
      offDays,
      createdAt,
      businessLogo,
    } = req.body;
    for (const key in req.body) {
      if (!req.body[key] || req.body[key].trim() === "") {
        return res.status(400).json({
          status: 400,
          msg: `Required field ${key} is missing or empty`,
        });
      }
    }
    const user = await Business.create({
      businessName,
      Address,
      state,
      city,
      pincode,
      businessType,
      contactEmail,
      contactPhone,
      openingHours,
      offDays,
      createdAt,
      businessLogo,
    });
    console.log(user);
    res.json({
      msg: "Business added successfully",
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: "Please check the details you have entered",
    });
  }
};
const getBusinesses = async (req, res) => {
  try {
      const getData = await Business.find();
      //  change find
      res.json({
          status: 200,
          msg: "Business exist",
          data: "fetch",
          getData,
      });
  } catch (err) {
      console.log(err);
  }
};

const updateBusiness = async (req, res) => {
  try {
    const id = req.params._id;
    const update = req.body;

    const schemaFields = Object.keys(Business.schema.paths);

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
    const updateData = await Business.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true, //schema validation and prevent invalid data
    });

    res.josn({
      status: 200,
      msg: "Business updated",
      data: "updated",
      updateData,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteBusiness = async (req, res) => {
  try {
    const id = req.params._id;
    const deleteData = await Business.findByIdAndDelete(id);
    if (deleteData) {
      res.json({
        status: 200,
        msg: "Business deleted successfully",
        data: deleteData,
      });
    } else {
      res.json({
        status: 404,
        msg: "Business not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { register, getBusinesses, updateBusiness, deleteBusiness };
