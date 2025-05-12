const UserModel = require('../models/user.model');
const { decryptPassword } = require('../utils/password.helper'); 
const jwt = require('jsonwebtoken')

const getByEmail =  async (email) => {
    const user = await UserModel.findOne({email});
    return user
}

const getByUsername = async (username) => {
    const user = await UserModel.findOne({username});
    return admin
}

const generateToken = (id, email) => {
    const token = jwt.sign({id, email} , process.env.JWT_SECRET,{
        expiresIn:'2m'
    })
    return token
}

const login = async (data) => {
    const user =  await getByEmail(data.email);
    if(!user) {
        throw new Error('Email or password incorrect')
    }
    if (!decryptPassword(user.password, data.password)) {
        throw new Error('Email or password incorrect')
    }
    const token = generateToken(user._id, user.email)
    return {user,token}
}


const register = async (data) => {
    const emailExist = await getByEmail(data.email);
    const usernameExist = await getByUsername(data.username);
    if(emailExist) {
        throw new Error('Email already exist')
    }
    if(usernameExist) {
        throw new Error('Username already exist')
    }
    const user = await UserModel.create(data);
    return user
}

const forgetPassword = (data) => {}

const resetPassword = (data) => {}

module.exports = {
    login,
    register,
    forgetPassword,
    resetPassword,

}