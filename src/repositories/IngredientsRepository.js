const knex = require('../database/knex');


// class to handle all the ingredients related operations
class IngredientsRepository {

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

    async findIngredientsByProductId(product_id) {

        // find the ingredients by product id and order by name
        const ingredients = await knex("ingredients").where({ product_id });

        return ingredients;

    }

    async findIngredientsByFilter(filter) {
        
        try {
            // find the ingredients by filter
            const ingredients = await knex("ingredients")
                .select([ // select the columns you want to return
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

        } catch (error) {
            console.error(error);
            return[]; // return an empty array if there is an error to avoid breaking the app
        }
    }

    async updateIngredients({ ingredients, product_id }) {

        // delete the ingredients
        await knex("ingredients").where({ product_id }).del();

        // create the ingredients
        await this.createIngredient({ ingredients, product_id });

        return;
    }
}

module.exports = IngredientsRepository;