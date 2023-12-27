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
}

module.exports = ProductsServices;