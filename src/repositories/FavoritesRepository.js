const knex = require('../database/knex');

//class to deal with the favorites table in the database
class FavoritesRepository {

    //find a favorite by product_id
    async findFavoriteByProductId({ product_id }) {
            
            try {
                //search for a favorite with the given product_id
                const favorite = await knex("favorites").where({ product_id }).first();
        
                return favorite;
                
            } catch {
                //if there is an error, throw an error
                throw new AppError("Falha ao buscar produto. Tente novamente mais tarde", 500);
            }

    }

    //create a new favorite in the database
    async createFavorite({ user_id, product_id }) {

        try {
            //create a new favorite in the database            
            const favorite = await knex('favorites').insert({ user_id, product_id });
    
            return favorite;
            
        } catch {
            //if there is an error, throw an error
            throw new AppError("Falha ao favoritar produto. Tente novamente mais tarde", 500);
        }

    }

    //list all favorites from the database with the given user_id
    async listFavorites(user_id) {

        try {
            //list all favorites from the database with the given user_id
            const userFavorites = await knex("favorites")
                .select([
                    "products.id",
                    "products.title",
                    "products.image"
                ])
                .where({ user_id })
                .innerJoin("products", "products.id", "favorites.product_id")
                .orderBy("user_id");

            return userFavorites;
        
        } catch {
            //if there is an error, throw an error
            throw new AppError("Falha ao listar favoritos. Tente novamente mais tarde", 500);
        }

    }

    //delete the favorite with the given id
    async deleteFavorite(id) {

        try {
            //delete the favorite with the given id
            await knex("favorites").where({ id }).del()

        } catch {
            //if there is an error, throw an error
            throw new AppError("Falha ao remover favorito. Tente novamente mais tarde", 500);

        }

    }

}

module.exports = FavoritesRepository;