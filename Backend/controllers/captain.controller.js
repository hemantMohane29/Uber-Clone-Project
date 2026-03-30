const captainModel = require('../models/captain.model');
const captainServices = require('../services/captain.services');
const blacklistTokenModel = require('../models/blacklistToken.model');  
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async ( req ,res , next ) => {
 
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json ({errors:errors.array() });
    }
    const { fullname, email, password , vehicle} = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});

    if(isCaptainAlreadyExist) {
        return res.status(400).json({ messages: 'Captain already exist'})
    }

    const hashPassword = await captainModel.hashPassword(password);

    const captain = await captainServices.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email: email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicletype: vehicle.vehicleType,
    });
   
    const token = captain.generateAuthToken();

    res.status(201).json({token, captain});
}

module.exports.loginCaptain = async (req , res , next) =>{
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}

const { email, password } = req.body;

const captain = await captainServices.findCaptainByEmail(email);

if (!captain) {
    return res.status(401).json({ message: 'Invalid email or password' });
}

// Compare password using model method
const isMatch = await captain.comparePassword(password);

if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
}

const token = captain.generateAuthToken();

res.cookie('token', token)

res.status(200).json({ message: 'Captain logged in successfully', token, captain });
}


module.exports.getCaptainProfile = async (req, res, next) => {
    const captainSafe = req.captain.toObject();
    delete captainSafe.password;
    res.status(200).json({ captain: captainSafe });
}


module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }
    await blacklistTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Captain logged out successfully' });
}