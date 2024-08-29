const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");
const { sendGreetMail2 } = require("../helper/mairServices2");
const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      date_of_birth,
      mobile_number,
      gender,
      address,
    } = req.body;
    const existingAdmin = await Admin.findOne({
      $or: [{ email: email }, { mobile_number: mobile_number }],
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      return res.status(400).json({
        msg: "Admin already exists with this email or mobile number",
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await Admin.create({
      name,
      email,
      password: hashedPassword,
      date_of_birth,
      mobile_number,
      gender,
      address,
    });
    if (email && name) {
      try {
        await sendGreetMail2(email, name);
        console.log("Greeting email sent!");
      } catch (error) {
        console.error("Error sending email:", error);
        // Optionally return if the email is critical
        return res.status(500).send("Failed to send greeting email");
      }
    }
    console.log(user);
    return res.status(201).json({
      msg: "Admin created successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "Please check the details you have entered or try again later",
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    for (const key in req.body) {
      if (!req.body[key] || req.body[key].trim() === "") {
        return res.status(400).json({
          status: 400,
          msg: `Field ${key} is missing or empty`,
        });
      }
    }
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ msg: "Incorrect credentials" });
    }

    // Compare both the passwords and check if they match
    const isMatch = await bcrypt.compare(password, admin.password);

    if (isMatch) {
      const token = jwt.sign({ email: admin.email }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).json({ msg: "Incorrect credentials" });
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ msg: "An error occurred" });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const id = req.params._id;
    const update = req.body;

    // Get the schema paths (field names)
    const schemaFields = Object.keys(Admin.schema.paths);

    // Check for any unknown fields
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

    if (update.password) {
      update.password = await bcrypt.hash(update.password, 10);
    }
    const updateData = await Admin.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updateData) {
      return res.status(404).json({
        status: 404,
        msg: "Admin not found",
      });
    }

    res.json({
      status: 200,
      msg: "Admin updated successfully",
      updateData,
    });
  } catch (error) {
    console.error("Error updating Admin:", error);
    res.status(500).json({
      status: 500,
      msg: "An error occurred while updating the Admin",
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const id = req.params._id;
    const deleteData = await Admin.findByIdAndDelete(id);
    if (deleteData) {
      res.json({
        status: 200,
        msg: "Admin deleted successfully",
        data: deleteData,
      });
    } else {
      res.json({
        status: 404,
        msg: "Admin not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { register, login, updateAdmin, deleteAdmin };
