const userModel = require('../models/user.model');

module.exports.createUser = async ({

    firstname, lastname, email, password
}) => {
     if(!firstname || !lastname || !email || !password) {
        throw new Error('All fields are required');
     }

     const user = await userModel.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password: await userModel.hashPassword(password),
     });

     return user;
};

module.exports.findUserByEmail = async (email) => {
  return userModel.findOne({ email }).select('+password');
};