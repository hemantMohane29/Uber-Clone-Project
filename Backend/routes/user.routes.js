const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const usercontroller = require('../controllers/user.controllers');

router.post('/register', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('firstname').isLength({ min: 3 }).withMessage('first name must be at least 3 characters long'),
  body('lastname').isLength({ min: 1 }).withMessage('last name is required'),
  body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long'),
],
usercontroller.registerUser
);

module.exports = router;
