const Jwt = require('jsonwebtoken'),
    Model = require('../Model');
const Config = require('../Config');
const { ResponseStatusCode } = require('../Config/constant');
const responseMessages = require('../Config/responseMessage')

/**Token authentication  */

var verifyToken = function (req, res, next) {

    const authorization = req.headers.authorization;

    if (authorization) {
        const token = authorization.replace("Bearer ", "");

        Jwt.verify(token, Config.CONSTANT.SecretKey.JWT_SECRET_KEY_USER, async (err, payload) => {
            if (err) {
                return res.sendStatus(403);
            }
            const { _id } = payload;
            const userData = await Model.user.findById(_id)
            req.user = userData;
            next();
        });
    } else {
        res.sendStatus({ status: ResponseStatusCode.Unauthorized, message: responseMessages.Unauthorized});
    }
};

module.exports = {
    verifyToken: verifyToken
};