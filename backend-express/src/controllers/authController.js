const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

/**
 * 📝 REGISTER USER
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ 
      success: false, 
      error: "User already exists with this email" 
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await User.create({ 
    name, 
    email, 
    password: hashedPassword 
  });

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

  // Remove password from response
  const userResponse = user.toObject();
  delete userResponse.password;

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,
    user: userResponse
  });
});

/**
 * 🔐 LOGIN USER
 * @desc    Authenticate user and get token
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user and include password for comparison
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ 
      success: false, 
      error: "Invalid credentials" 
    });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ 
      success: false, 
      error: "Invalid credentials" 
    });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

  // Remove password from response
  const userResponse = user.toObject();
  delete userResponse.password;

  res.json({
    success: true,
    message: "Login successful",
    token,
    user: userResponse
  });
});
