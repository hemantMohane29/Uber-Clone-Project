const captainModel = require('../models/captain.model');
const captainServices = require('../services/captain.services');
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



