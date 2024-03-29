const AppError = require("../utils/AppError");
const IngredientsRepository = require("../repositories/IngredientsRepository");
const DiskStorage = require("../providers/DiskStorage")

//class to handle the products db requests
class ProductsServices {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }

    async createProduct({ title, price, description, category, ingredients }) {

        // check if all fields are filled
        if(!title || !price || !description || !category || !ingredients) {
            throw new AppError("Preencha todos os campos!")
        }

        // check if category value is valid
        if(category !== "food" && category !== "drink" && category !== "dessert") {
            throw new AppError("Categoria inválida!");
        }

        // check if the product already exists
        const productAlreadyExists = await this.productsRepository.findProductByTitle(title);

        if(productAlreadyExists) {
            throw new AppError("Produto já cadastrado!");
        }

        // create the product and return the id
        const createdProductId = await this.productsRepository.createProduct({ title, price, description, category, ingredients });

        return createdProductId;
    }

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
        
        // Promise.all() is used to ensure that all these asynchronous operations are completed before proceeding.
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

    async updateProduct({ id, title, price_in_cents, description, category, ingredients, image }) {
        const product = await this.productsRepository.findProductById(id);

        if(!product) {
            throw new AppError("Produto não encontrado!");
        }

        // check if there is category and if it is valid
        if(category && category !== "food" && category !== "drink" && category !== "dessert") {
            throw new AppError("Categoria inválida!");
        }

        // update the product with the new values or the old values if there is no new values
        product.title = title ?? product.title;
        product.price_in_cents = price_in_cents ?? product.price_in_cents;
        product.description = description ?? product.description;
        product.category = category ?? product.category;
        product.image = image ?? product.image;

        // create the updated product object
        const updatedProduct = {
            title: product.title,
            price: product.price_in_cents,
            description: product.description,
            category: product.category,
            image: product.image
        }

        // update the product
        await this.productsRepository.updateProduct({ id, product: updatedProduct, ingredients });

        return;
    }

    async deleteProduct(id) {
        await this.productsRepository.deleteProduct(id);
    }

    async uploadImage({ product_id, image }) {

        const diskStorage = new DiskStorage();
        
        // find the product
        const product = await this.productsRepository.findProductById(product_id);

        // if the product is not found, throw an error
        if(!product) {
            throw new AppError("Produto não encontrado!");
        }

        // if the product already has an image, delete the old image
        if(product.image) {
            await diskStorage.deleteFile(product.image);
        }

        // save the new image
        const filename = await diskStorage.saveFile(image);
        product.image = filename;

        // update the product with the new image
        await this.updateProduct({ id: product_id, image: product.image });

        return;
    }
}

module.exports = ProductsServices;