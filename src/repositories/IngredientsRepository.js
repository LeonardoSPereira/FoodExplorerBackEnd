const knex = require('../database/knex');


// class to handle all the ingredients related operations
class IngredientsRepository {

    // create a new ingredient
    async createIngredient({ ingredients, product_id }) {

        // create a new ingredient
        const ingredientsInsert = ingredients.map(ingredient => {
            return {
                product_id,
                name: ingredient,
            }
        })

        // insert the ingredient to the db
        await knex("ingredients").insert(ingredientsInsert);

        return
    }

}

module.exports = IngredientsRepository;