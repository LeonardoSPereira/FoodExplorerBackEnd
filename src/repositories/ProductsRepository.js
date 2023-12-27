const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const IngredientsRepository = require('./IngredientsRepository');

// class to handle the products db requests
class ProductsRepository {
    
    // create a new product
    async createProduct({ name, price, description, category, ingredients }) {
        
        const ingredientsRepository = new IngredientsRepository();
        
        //format the price to number and cents
        const formattedPrice = price.replace(",", ".");
        const parsedPrice = parseFloat(formattedPrice);
        const priceInCents = parsedPrice * 100;

        
        //create the product and return the id
        const [product] = await knex("products").insert({
            name,
            price_in_cents: priceInCents,
            description,
            category
        }).returning("id");

        // create the ingredients
        await ingredientsRepository.createIngredient({ ingredients, product_id: product.id });

    }

    async findProductById(id) {

        const ingredientsRepository = new IngredientsRepository();

        // find the product by id
        const productById = await knex("products").where({ id }).first();

        // if the product is not found, throw an error
        if(!productById) {
            throw new AppError("Produto não encontrado!");
        }

        // find the ingredients by product id
        const ingredients = await ingredientsRepository.findIngredientsByProductId(id);

        // if the product has ingredients, return the product with the ingredients
        if(ingredients) {
            
            const product = {
                ...productById,
                ingredients
            }

            return product

        } else {

            return productById;
        }
    }

}

module.exports = ProductsRepository;