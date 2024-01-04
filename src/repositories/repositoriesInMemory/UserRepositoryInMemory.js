class UserRepositoryInMemory {
    constructor() {
        this.id = Math.floor(Math.random() * 1000) + 1
        this.users = [];
    }
    
    async createUser({ name, email, password }) {
        // create the user
        const user = {
            id: this.id,
            name,
            email,
            password
        }
        
        // add the user to the users array
        this.users.push(user);

        return this.users[0]
    }

    async findUserByEmail(email) {
        // find the user by email
        const user = this.users.find(user => user.email === email);

        return user;
    }
}

module.exports = UserRepositoryInMemory;