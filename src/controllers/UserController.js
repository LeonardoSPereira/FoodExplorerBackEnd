const AppError = require("../utils/AppError");
const UserRepository = require("../repositories/UserRepository");
const UserServices = require("../services/UserServices");

// Controller to deal with user requests
class UserController {

    //function to deal with user creation
    async create(request, response) {
        
        // get the name, email and password from the request body
        const { name, email, password } = request.body;

        const userRepository = new UserRepository();
        const userServices = new UserServices(userRepository);

        // create a new user
        const userCreated = await userServices.createUser({ name, email, password });

        response.status(201).json(userCreated)
    }
}

module.exports = UserController;