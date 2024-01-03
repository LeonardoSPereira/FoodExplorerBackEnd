const knex = require("../database/knex");
// class to handle all user related database operations
class UserRepository {

    async findUserByEmail(email) {
        try {
            const user = await knex("users").where({ email }).first();

            return user;

        } catch {
            throw new AppError("Erro ao buscar usuário", 500);
        
        }
    }

    async createUser({ name, email, password }) {
        try {
            const user = await knex("users").insert({ name, email, password });

            return user;
        
        } catch {
            throw new AppError("Erro ao criar usuário", 500);
        }
    }

    async findUserById(id) {
        try {
            const user = await knex("users").where({ id }).first();

            return user;

        } catch {
            throw new AppError("Erro ao buscar usuário", 500);
        }
    }

}

module.exports = UserRepository;