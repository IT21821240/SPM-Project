const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// Controller to register a new user by hashing their password and saving them to the database
const registerUser = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ error: "Phone number already registered" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ error: "Email address is already registered" });
    }

    const user = new User({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ user, message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to log in a user by validating their credentials and generating a JWT token
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid Email, Try again!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Password, Try again!");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, name: user.name, email: user.email },
      JWT_SECRET
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to log out a user by removing their token from local storage
const logoutUser = async (req, res) => {
  try {
    localStorage.removeItem("token");
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to update the user's profile information in the database
const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new Error("User not found");
    }

    user.name = name;
    (user.phone = phone), (user.email = email);

    await user.save();
    res.json({ user, message: "User profile updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to delete the user's profile from the database
const deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new Error("User not found");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User profile deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to get a list of all users with the role 'user', accessible only to admin users
const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    // Find all users with the role 'user', excluding the password and role field
    const users = await User.find({ role: "user" }, { password: 0, role: 0 });
    res.json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to get the profile of the logged-in user
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new Error("User not found");
    }

    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Export all controller functions
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  deleteUserProfile,
  getAllUsers,
  getUserProfile,
};
