const FavoritesRepository = require('../repositories/FavoritesRepository');
const FavoritesServices = require('../services/FavoritesServices');


//class to deal with the favorites table in the database
class FavoritesController {

    //this method should create a new favorite in the database
    async create(request, response) {
        const { user_id, product_id } = request.body;

        const favoritesRepository = new FavoritesRepository();
        const favoritesServices = new FavoritesServices(favoritesRepository);

        //create a new favorite in the database
        await favoritesServices.createFavorite({ user_id, product_id });


        return response.status(201).json({
            status: "success",
            message: "Produto favoritado com sucesso!",
        })
    }

    //this method should list all favorites from the database
    async index(request, response) {
        const { user_id } = request.params;

        const favoritesRepository = new FavoritesRepository();
        const favoritesServices = new FavoritesServices(favoritesRepository);

        //list all favorites from the database with the given user_id
        const favorites = await favoritesServices.listFavorites(user_id);

        return response.json(favorites);

    }
    
    //this method should delete a favorite from the database
    async delete(request, response) {
        const { id } = request.params;


        const favoritesRepository = new FavoritesRepository();
        const favoritesServices = new FavoritesServices(favoritesRepository);

        //delete the favorite with the given id
        await favoritesServices.deleteFavorite(id);


        return response.json({
            status: "success",
            message: "Produto removido dos favoritos com sucesso!",
        })

    }

}

module.exports = FavoritesController;