//class to handle all user related operations
class UserService {

    // inject the UserRepository dependency
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }

    // create a new user
    async createUser({ name, email, password }) {}


}

module.exports = UserService;