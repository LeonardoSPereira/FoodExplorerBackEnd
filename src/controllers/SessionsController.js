const UserRepository = require('../repositories/UserRepository');
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require("../config/auth");
const { sign } = require("jsonwebtoken");

class SessionsController {

    async create(request, response) {
        
        const { email, password } = request.body;

        const userRepository = new UserRepository();

        // check if user exists
        const user = await userRepository.findUserByEmail(email);

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

        // set token to cookie
        response.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 15 * 60 * 1000
        })

        // delete password from user object
        delete user.password;

        response.status(201).json({user, token})
    }
}

module.exports = SessionsController;