const knex = require('../database/knex');
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
            price: priceInCents,
            description,
            category
        }).returning("id");

        console.log("prod id: ", product.id);

        // create the ingredients
        await ingredientsRepository.createIngredient({ ingredients, product_id: product.id });

    }

}

module.exports = ProductsRepository;