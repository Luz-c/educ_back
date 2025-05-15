const UserService = require('../services/auth.service');


//Post Login
const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const result = await UserService.login({ userName, password });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Post Register
const register = async (req, res) => {
    try {
        const result = await UserService.register(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.log('message:', error);
        res.status(400).json({ message: error.message });
    }
};

//Post ForgetPassword
const forgetPassword = async (req, res) => {
    try {
        const { userName } = req.body;
        const result = await UserService.forgetPassword(userName);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Post ResetPassword
const resetPassword = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const result = await UserService.resetPassword(userName, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { login, register, forgetPassword, resetPassword };