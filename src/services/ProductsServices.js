const AppError = require("../utils/AppError");
const IngredientsRepository = require("../repositories/IngredientsRepository");

//class to handle the products db requests
class ProductsServices {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }

    // create a new product
    async createProduct({ name, price, description, category, ingredients }) {

        // check if all fields are filled
        if(!name || !price || !description || !category || !ingredients) {
            throw new AppError("Preencha todos os campos!")
        }

        // check if category value is valid
        if(category !== "food" && category !== "drink" && category !== "dessert") {
            throw new AppError("Categoria inválida!");
        }

        // create the product
        await this.productsRepository.createProduct({ name, price, description, category, ingredients });

        return
    }


    // list one product
    async showOneProduct(id) {

        // find the product
        const product = await this.productsRepository.findProductById(id);

        if(!product) {
            throw new AppError("Produto não encontrado!");
        }

        return product;

    }

    async listProducts(filter) {

        const ingredientsRepository = new IngredientsRepository();

        let products;

        //if there is a filter, find the products by filter(ingredients or name)
        if(filter) {

            // split the filter string into an array
            const splittedFilter = filter.split(",").map(item => item.trim());

            // find the products by filter
            products = await this.productsRepository.findProductsByFilter(splittedFilter);

        } else {

            // if there is no filter, list all products
            products = await this.productsRepository.findAllProducts();

        }

        
        // if there is no products, throw an error
        if(!products) {
            throw new AppError("Nenhum produto encontrado!");
        }


        // for each product, find the ingredients and add to the product object
        //Promise.all() is used to ensure that all these asynchronous operations are completed before proceeding.
        const productsWithIngredients = await Promise.all(products.map(async product => {

            // find the ingredients
            const productsIngredients = await ingredientsRepository.findIngredientsByProductId(product.id);
            
            // add the ingredients to the product object
            const ingredients = productsIngredients.filter(ingredient => ingredient.product_id === product.id);
        
            // return the product with the ingredients
            return {
                ...product,
                ingredients
            };
        }));
        
        return productsWithIngredients;
        
    }
}

module.exports = ProductsServices;