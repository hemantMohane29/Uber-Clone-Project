const captainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { authCaptain } = require('../middlewares/auth.middleware');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register' ,[
    body('fullname.firstname')
        .isString().withMessage('First name must be a string')
        .isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),

    body('fullname.lastname')
        .isString().withMessage('Last name must be a string')
        .isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),

    body('email')
        .isEmail().withMessage('Please enter a valid email'),

    body('password')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('vehicle.color')
        .isString().withMessage('Vehicle color must be a string')
        .isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),

    body('vehicle.plate')
        .isString().withMessage('Vehicle plate must be a string')
        .isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),

    body('vehicle.capacity')
        .isInt({ min: 1 }).withMessage('Capacity must be at least 1'),

    body('vehicle.vehicleType')
        .isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be one of car, motorcycle, auto')

],

   captainController.registerCaptain

)

router.post('/login' , [
    body('email')
        .isEmail().withMessage('Please enter a valid email'),

    body('password')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')

],

   captainController.loginCaptain
)


router.get('/profile', authMiddleware.authCaptain ,captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);


module.exports = router;