const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../config/auth");

function ensureAuthenticated(request, response, next) {

    // get request header
    const authHeader = request.headers;

    // check if request header exists 
    if(!authHeader.cookie) {
        throw new AppError("Token JWT não encontrado", 401);
    }

    // split request header cookie to get token
    const [, token] = authHeader.cookie.split("token=");

    if(!token) {
        throw new AppError("Token JWT não encontrado", 401);
    }

    try {
        // verify if token is valid and get user id and admin status
        const { isAdmin, sub: user_id } = verify(token, authConfig.jwt.secret);
        
        // set user id and admin status to request
        request.user = {
            isAdmin,
            id: user_id
        };

        //continue
        return next()

    } catch {
        throw new AppError("Token JWT inválido", 401);
    }
}

module.exports = ensureAuthenticated;