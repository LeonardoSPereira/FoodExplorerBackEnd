const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const IngredientsRepository = require('./IngredientsRepository');

// class to handle the products db requests
class ProductsRepository {
    
    async createProduct({ title, price, description, category, ingredients }) {
        
        try {
            const ingredientsRepository = new IngredientsRepository();
        
            //format the price to number and cents
            const formattedPrice = price.replace(",", ".");
            const parsedPrice = parseFloat(formattedPrice);
            const priceInCents = parsedPrice * 100;

            
            //create the product and return the id
            const [product] = await knex("products")
             .insert({
                title,
                price_in_cents: priceInCents,
                description,
                category
             })
             .returning("id");

            // create the ingredients
            await ingredientsRepository.createIngredient({ ingredients, product_id: product.id });

            return product.id;

        } catch {
            //if there is an error, throw an error
            throw new AppError("Falha ao criar produto. Tente novamente mais tarde", 500);
        }
    }

    async findProductById(id) {

        const ingredientsRepository = new IngredientsRepository();

        try {
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
        } catch {
            //if there is an error, throw an error
            throw new AppError("Falha ao buscar produto. Tente novamente mais tarde", 500);
        }
    }

    async findProductsByFilter(filter) {

        const ingredientsRepository = new IngredientsRepository();

        try {
            // find the products by filter
            const [filteredProducts] = await Promise.all(filter.map(async product => {
                
                // find the products by filter
                const products = await knex("products").whereLike("title", `%${product}%`).orderBy("title");
                
                return products;
                
            }))

            // find the ingredients by filter
            const filteredIngredients = await ingredientsRepository.findIngredientsByFilter(filter);

            // return the products and ingredients
            return [...filteredProducts, ...filteredIngredients];

        } catch{
            //if there is an error, throw an error
            throw new AppError("Falha ao buscar produtos. Tente novamente mais tarde", 500);
        }

    }

    async findAllProducts() {
        
       try {
            const products = await knex("products").orderBy("created_at");

            return products;
        } catch {
            //if there is an error, throw an error
            throw new AppError("Falha ao buscar produtos. Tente novamente mais tarde", 500);
        }
    }

    async updateProduct({ id, product, ingredients }){

        const ingredientsRepository = new IngredientsRepository();

        try {
            
            let priceInCents = product.price;

            //format the price to number and cents if the price is a string
            if(typeof product.price !== "number") {

                const formattedPrice = product.price.replace(",", ".");
                const parsedPrice = parseFloat(formattedPrice);
                priceInCents = parsedPrice * 100;

            }

            // update the product
            await knex("products")
            .where({ id })
            .update({
                title: product.title,
                price_in_cents: priceInCents,
                description: product.description,
                category: product.category,
                image: product.image,
                updated_at: knex.fn.now()
            });

            // if the product has ingredients, update the ingredients
            if(ingredients) {
                await ingredientsRepository.updateIngredients({ ingredients, product_id: id });
            }

            return;
            
        } catch {
            //if there is an error, throw an error
            throw new AppError("Falha ao atualizar produto. Tente novamente mais tarde", 500);
        }
    }

    async deleteProduct(id) {

        try {
            // delete the product
            await knex("products").where({ id }).del();

            return;
        
        } catch (error){
            console.error(error);
            //if there is an error, throw an error
            throw new AppError("Falha ao deletar produto. Tente novamente mais tarde", 500);
        }
    }
}

module.exports = ProductsRepository;