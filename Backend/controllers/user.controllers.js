const userService = require('../services/user.services');
const { validationResult } = require('express-validator');
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, email, password } = req.body;

  const user = await userService.createUser({
    firstname,
    lastname,
    email,
    password,
  });

  const token = await user.generateAuthToken();

  const userSafe = user.toObject();
  delete userSafe.password;

  res.status(201).json({ message: 'User registered successfully', token, user: userSafe });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userService.findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = await user.generateAuthToken();

  res.cookie('token', token);

  const userSafe = user.toObject();
  delete userSafe.password;

  res.status(200).json({ message: 'User logged in successfully', token, user: userSafe });
};

module.exports.getUserProfile = async (req, res, next) => {
  const userSafe = req.user.toObject();
  delete userSafe.password;
  res.status(200).json({ user: userSafe });
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      await BlacklistToken.create({ token });
    } catch (err) {
      if (err.code !== 11000) throw err;
    }
  }
  res.clearCookie('token');
  res.status(200).json({ message: 'User logged out successfully' });
};