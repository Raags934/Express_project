`use strict`;

module.exports = {
    ResponseStatusCode: {
        Success: 200,
        NotFound: 404,
        Unauthorized: 401,
        BadRequest: 400,
    },
    PasswordEncryption: {
        SALT: 11,
    },
    SecretKey: {
        JWT_SECRET_KEY_USER: "supersecret"
    },
    Role :{
        ADMIN: 'Admin',
        USER : 'User',
    }

};






