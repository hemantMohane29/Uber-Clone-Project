const captainModel = require('../models/captain.model')

module.exports.createCaptain = async ({
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicletype,

}) => {
   if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !color ||
      !plate ||
      !capacity ||
      !vehicletype
   ) {
      throw new Error('All fields are required');
   }

   const captain = await captainModel.create({
      fullname: {
         firstname,
         lastname
      },
      email,
      password,
      vehicle: {
         color,
         plate,
         capacity,
         vehicleType: vehicletype,
      },
   });

   return captain;

}




module.exports.findCaptainByEmail = async (email) => {
    return captainModel.findOne({ email }).select('+password');
}
