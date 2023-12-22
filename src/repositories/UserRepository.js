const knex = require("../database/knex");
// class to handle all user related database operations
class UserRepository {

    async findUserByEmail(email) {
        const user = await knex("users").where({ email }).first();

        return user;
    }

    async createUser({ name, email, password }) {
        const user = await knex("users").insert({ name, email, password }).returning("*");

        return user;
    }

}

module.exports = UserRepository;