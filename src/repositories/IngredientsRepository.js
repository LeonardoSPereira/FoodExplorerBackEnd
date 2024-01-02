const knex = require('../database/knex');
const AppError = require('../utils/AppError');


// class to handle all the ingredients related operations
class IngredientsRepository {

    async createIngredient({ ingredients, product_id }) {

        try {
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
            
        } catch {
            //if there is an error, throw an error
            throw new AppError("Falha ao criar ingredientes. Tente novamente mais tarde", 500);
        }
    }

    async findIngredientsByProductId(product_id) {
        try {
            // find the ingredients by product id and order by name
            const ingredients = await knex("ingredients").where({ product_id });

            return ingredients;

        } catch {
            //if there is an error, throw an error
            throw new AppError("Falha ao buscar ingredientes. Tente novamente mais tarde", 500);
        }

    }

    async findIngredientsByFilter(filter) {
        
        try {
            // find the ingredients by filter
            const ingredients = await knex("ingredients")
                .select([ // select the product fields that will be returned
                    "products.id",
                    "products.title",
                    "products.price_in_cents",
                    "products.description",
                    "products.category",
                    "products.image",
                ])
                .whereIn("name", filter) //filter the ingredients by name
                .innerJoin("products", "products.id", "ingredients.product_id") // join the products table
                .groupBy("products.id") // group by product id
                .orderBy("products.title"); // order by title

            return ingredients; // return the ingredients

        } catch {
            console.error(error);
            return[]; // return an empty array if there is an error to avoid breaking the app
        }
    }

    async updateIngredients({ ingredients, product_id }) {

        try {
            // delete the ingredients
            await knex("ingredients").where({ product_id }).del();

            // create the ingredients
            await this.createIngredient({ ingredients, product_id });

            return;

        } catch {
            //if there is an error, throw an error
            throw new AppError("Falha ao atualizar ingredientes. Tente novamente mais tarde", 500);
        }
    }
}

module.exports = IngredientsRepository;