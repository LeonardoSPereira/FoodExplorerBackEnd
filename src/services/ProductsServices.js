const AppError = require("../utils/AppError");

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

        // create the product
        await this.productsRepository.createProduct({ name, price, description, category, ingredients });

        return
    }
}

module.exports = ProductsServices;