const AppError = require("../utils/AppError");

//class to deal with the favorites table in the database
class FavoritesServices {
    constructor(favoritesRepository) {
        this.favoritesRepository = favoritesRepository;
    }

    //this method should create a new favorite in the database
    async createFavorite({ user_id, product_id }) {

        //check if the user_id and product_id were provided
        if(!user_id || !product_id) {
            throw new AppError("Falha ao favoritar produto. Favor informar o id do usuário e do produto.");
        }

        //check if there is a favorite with the given product_id and throw an error if there is
        const favoriteExists = await this.favoritesRepository.findFavoriteByProductId({ product_id });

        if(favoriteExists) {
            throw new AppError("Falha ao favoritar produto. Produto já favoritado.");
        }

        //create a new favorite in the database
        const favorite = await this.favoritesRepository.createFavorite({ user_id, product_id });

        return favorite;
    }

    //this method should list all favorites from the database with the given user_id
    async listFavorites(user_id) {
        //check if the user_id was provided
        if(!user_id) {
            throw new AppError("Falha ao listar favoritos. Favor informar o id do usuário.");
        }

        //list all favorites from the database with the given user_id
        const favorites = await this.favoritesRepository.listFavorites(user_id);

        return favorites;
    }

    //this method should delete a favorite from the database
    async deleteFavorite(id) {
        //check if the id was provided
        if(!id) {
            throw new AppError("Falha ao remover favorito. Favor informar o id do favorito.");
        }
        
        //delete the favorite with the given id
        await this.favoritesRepository.deleteFavorite(id);
    
        return;
    }
}

module.exports = FavoritesServices;