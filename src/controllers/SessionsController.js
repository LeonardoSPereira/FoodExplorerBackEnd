const UserRepository = require('../repositories/UserRepository');
const SessionsServices = require('../services/SessionsServices');

class SessionsController {

    async create(request, response) {
        
        const { email, password } = request.body;

        const userRepository = new UserRepository();
        const sessionsServices = new SessionsServices(userRepository);

        const { user, token } = await sessionsServices.createSession({ email, password });
        

        // set token to cookie
        response.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 30 * 60 * 1000 // 30 minutes
        })

        response.status(201).json({user, token})
    }
}

module.exports = SessionsController;