import express from 'express';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

// User Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id), // Generate a JWT token
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.error('Error signing up:', error);
  }
});

// User Signin
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      // If the user exists and the password matches, return user details and a token
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id), // Generate a JWT token
      });
    } else {
      // If the credentials are invalid, return an error
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.error('Error signing in:', error);
  }
});

export default router;