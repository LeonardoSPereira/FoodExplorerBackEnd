const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

//class to handle all user related operations
class UserServices {

    // inject the UserRepository dependency
    constructor(UserRepository) {
        this.userRepository = UserRepository;
    }

    // create a new user
    async createUser({ name, email, password }) {

        // check if the name, email and password are provided
        if( !name || !email || !password ) {
            throw new AppError("Preencha todos os campos!");
        }

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        const validEmail = validateEmail(email);

        if(!validEmail) {
            throw new AppError("Formato de e-mail inválido!")
        }

        // check if the email is already in use
        const userExists = await this.userRepository.findUserByEmail(email);

        if(userExists) {
            throw new AppError("E-mail já cadastrado");
        }

        // hash the password
        const hashedPassword = await hash(password, 12);


        // create a new user
        const userCreated = await this.userRepository.createUser({ name, email, password: hashedPassword });

        return userCreated;
    }

}

module.exports = UserServices;