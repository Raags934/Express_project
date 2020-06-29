
var bcrypt = require('bcrypt');
const Config = require('../Config');
const jwt = require('jsonwebtoken');


const encryptPassword = async (password, ) => {
    let encryptedPassword = bcrypt.hashSync(password.toString(), Config.CONSTANT.PasswordEncryption.SALT);
    return encryptedPassword;
}

const decryptPassword = async (currentPassword, dbPassword) => {
    let decryptPassword = bcrypt.compareSync(currentPassword, dbPassword);
    return decryptPassword;
}

const tokenGenerator = async (role, _id, SecretKey) => {
    let token = jwt.sign({ scope: role, "_id": _id }, SecretKey);
    return token
}
module.exports = {
    // sendMessage: sendMessage,
    // sendemail: sendemail,
    encryptPassword: encryptPassword,
    decryptPassword: decryptPassword,
    tokenGenerator: tokenGenerator
}
