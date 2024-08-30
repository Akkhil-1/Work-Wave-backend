const User = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");
const { sendGreetMail } = require("../helper/mailServices");
const register = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile_number,
      password,
      gender,
      address,
    } = req.body;
    const existingUser = await User.findOne({
      $or: [{ email: email }, { mobile_number: mobile_number }],
    });

    // const requiredFields = Object.keys(Admin.schema.paths).filter(field => Admin.schema.paths[field].isRequired);

    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({
        msg: "User already exists with this email or mobile number",
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
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
        await sendGreetMail(email, name);
        console.log("Greeting email sent!");
      } catch (error) {
        console.error("Error sending email:", error);
        // Optionally return if the email is critical
        return res.status(500).send("Failed to send greeting email");
      }
    }
    console.log(user);
    return res.status(201).json({
      msg: "User created successfully",
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
    console.log("Email:", email);
    console.log("Password:", password);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Incorrect credentials" });
    }

    // Compare both the passwords and check if they match
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
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

const updateUser = async (req, res) => {
  try {
    const id = req.params._id;
    const update = req.body;

    // Get the schema paths (field names)
    const schemaFields = Object.keys(User.schema.paths);

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

    const updateData = await User.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updateData) {
      return res.status(404).json({
        status: 404,
        msg: "User not found",
      });
    }

    res.json({
      status: 200,
      msg: "User updated successfully",
      updateData,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      status: 500,
      msg: "An error occurred while updating the user",
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params._id;
    const deleteData = await User.findByIdAndDelete(id);
    if (deleteData) {
      res.json({
        status: 200,
        msg: "User deleted successfully",
        data: deleteData,
      });
    } else {
      res.json({
        status: 404,
        msg: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { register, login, updateUser, deleteUser };
