//class to deal with the favorites table in the database
class FavoritesController {

    //this method should create a new favorite in the database
    async create(request, response) {
        const { user_id, product_id } = request.body;

        return response.json({ user_id, product_id })
    }

    //this method should list all favorites from the database
    async index() {}
    
    //this method should delete a favorite from the database
    async delete() {}

}

module.exports = FavoritesController;