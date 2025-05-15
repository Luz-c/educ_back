const mongoose = require('mongoose');

const { Schema } = mongoose;
const {hashPassword} = require("../utils/password.helper")

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: false
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        Institution: {
            type: String,
            required: false
        },
        role: {
            type: String,
            enum: ['user', 'teacher', 'admin'],
            default: 'user',
            required: true
        },
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", function(next){
    const user = this;
    if(!user.isModified('password')){
        return next();
    }
    try {
        user.password = hashPassword(user.password);
        next();
    } catch (error) {
        next(error);
    }

})

module.exports = mongoose.model('User', userSchema);