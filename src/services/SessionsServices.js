const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require("../config/auth");
const { sign } = require("jsonwebtoken");

class SessionsServices {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async createSession({ email, password }) {
        // check if user exists
        const user = await this.userRepository.findUserByEmail(email);

        // if user does not exists, throw error
        if(!user) {
            throw new AppError("Email ou senha incorretos", 401);
        }

        // check if password is correct
        const passwordMatch = await compare(password, user.password);

        // if password is incorrect, throw error
        if(!passwordMatch) {
            throw new AppError("Email ou senha incorretos", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        // generate token with user id and admin status
        const token = sign({ isAdmin: user.isAdmin }, secret, {
            subject: user.id,
            expiresIn
        })

        // delete password from user object
        delete user.password;

        return { user, token };
    }
}

module.exports = SessionsServices;