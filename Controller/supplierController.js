const CommonQueries = require('../Queries').queries,
  Model = require('../Model');
const jwt = require('jsonwebtoken');
const { ResponseStatusCode } = require('../Config/constant');
const responseMessages = require('../Config/responseMessage')
const Config = require('../Config')
const utils = require('../Utils/commonFunction')


var bcrypt = require('bcrypt');

var supplierRegistrationController = async function (query) {
  try {
    console.log("|||+++++++++++Query++++++++++++|||",query);
    let encryptPassword = await utils.encryptPassword(query.password)
    query.password = encryptPassword
    var users = await CommonQueries.saveData(Model.supplier, query);
    return users;
  } catch (error) {
    // Log Errors
    throw Error('Error while Paginating Users')
  }
}

var supplierLoginController = async function (query) {
  try {
    var user = await CommonQueries.getData(Model.supplier, { email: query.email }, {});
    if (user === 0) {
      throw { status: ResponseStatusCode.BadRequest, message: responseMessages.DataNotFound }

    }

    let checkpassword = await utils.decryptPassword(query.password,user[0].password)
    /**Here compareSync return true or false */
    if (checkpassword == false)
      throw Config.responseMessages.ERROR.UNAUTHORIZED
    else {
      var token = jwt.sign({
        scope: "ARTIST",
        "_id": user[0]._id
      }, Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_USER);
      return token
    }
  } catch (error) {
    // Log Errors
    throw Error('Error while Paginating Users')
  }
}

module.exports =
  {
    supplierRegistrationController: supplierRegistrationController,
    supplierLoginController: supplierLoginController
  }