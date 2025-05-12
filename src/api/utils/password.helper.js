const bcrypt = require("bcryptjs")


const hashPassword = (password) => {
    const salt= bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt);
}

const decryptPassword = (hashedPwd, pwd) => {
    return bcrypt.compareSync(pwd, hashedPwd);
}

module.exports = {
    hashPassword,
    decryptPassword
}