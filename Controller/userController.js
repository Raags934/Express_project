const CommonQueries = require('../Queries').queries,
  Model = require('../Model');
const Config = require('../Config');
const utils = require('../Utils/commonFunction')
const { ResponseStatusCode } = require('../Config/constant');
const responseMessages = require('../Config/responseMessage')


var userRegistrationController = async function (query) {
  try {
    let encryptPassword = await utils.encryptPassword(query.password)
    query.password = encryptPassword
    var users = await CommonQueries.saveData(Model.user, query);
    return users;
  } catch (error) {
    // Log Errors
    throw { status: ResponseStatusCode.BadRequest, message: error }
  }
}

var userLoginController = async function (query) {
  try {
    var user = await CommonQueries.getData(Model.user, { email: query.email }, {});
    if (!user) {
      throw { status: ResponseStatusCode.BadRequest, message: responseMessages.DataNotFound }
    }
    let checkpassword = await utils.decryptPassword(query.password, user[0].password);

    /**Here compareSync return true or false */
    if (checkpassword == false)
      throw Config.responseMessages.ERROR.UNAUTHORIZED
    else {
      let role = Config.CONSTANT.Role.USER,
        secreKey = Config.CONSTANT.SecretKey.JWT_SECRET_KEY_USER
      var token = await utils.tokenGenerator(role, user[0]._id, secreKey)
      return token
    } 
  } catch (error) {
    // Log Errors
    throw { status: ResponseStatusCode.BadRequest, message: error }    
  }
}



var userSave = async function (query) {
  try {
    console.log("chec k the result ", query)
    // query.password = bcrypt.hashSync(query.password.toString(), Config.APP_CONSTANTS.SERVER.SALT);
    var users = await CommonQueries.saveData(Model.save, query);
    return users;
  } catch (error) {
    // Log Errors
    throw { status: ResponseStatusCode.BadRequest, message: error }    

  }
}


var getProfile = async function (query) {
  try {
    console.log("check the qyuery " , query);
    var user = await CommonQueries.getData(Model.user, { email: query.email }, {});
    console.log("check the user ", user);

    // console.log("chec k the result ", query)
    // query.password = bcrypt.hashSync(query.password.toString(), Config.APP_CONSTANTS.SERVER.SALT);
    // var users = await Queries.saveData(Model.save, query);
    return user;
  } catch (error) {
    // Log Errors
    throw { status: ResponseStatusCode.BadRequest, message: error }    

  }
}

module.exports =
  {
    userRegistrationController: userRegistrationController,
    userLoginController: userLoginController,
    userSave: userSave,
    getProfile: getProfile
  }