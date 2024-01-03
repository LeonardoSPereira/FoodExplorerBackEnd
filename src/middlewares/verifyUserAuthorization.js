const AppError = require("../utils/AppError");

function verifyUserAuthorization(request, response, next) {

    // get user admin status from request
    const { isAdmin } = request.user;

    // check if user is admin
    if(!isAdmin) {
        throw new AppError("Usuário não autorizado", 401);
    }

    // continue
    return next();
}

module.exports = verifyUserAuthorization;