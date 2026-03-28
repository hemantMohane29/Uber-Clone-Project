const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const usercontroller = require('../controllers/user.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('firstname').isLength({ min: 3 }).withMessage('first name must be at least 3 characters long'),
  body('lastname').isLength({ min: 1 }).withMessage('last name is required'),
  body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long'),
],
  usercontroller.registerUser
)

router.post('/login', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long'),
],
  usercontroller.loginUser
)

router.get('/profile', authMiddleware.authenticateUser, usercontroller.getUserProfile);
router.get('/logout', authMiddleware.authenticateUser, usercontroller.logoutUser);

module.exports = router;
