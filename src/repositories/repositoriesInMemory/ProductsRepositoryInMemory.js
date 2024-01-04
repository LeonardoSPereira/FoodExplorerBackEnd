const IngredientsRepositoryInMemory = require("./IngredientsRepositoryInMemory");


class ProductsRepositoryInMemory {
    constructor() {
        this.products = [];
        this.id = Math.floor(Math.random() * 1000) + 1
    }

    async createProduct({ title, price, description, category, ingredients }) {

        const ingredientsRepositoryInMemory = new IngredientsRepositoryInMemory();

        //create the ingredients
        const createdIngredients = await ingredientsRepositoryInMemory.createIngredients(ingredients)

        //create the product
        const product = {
            id: this.id,
            title,
            price,
            description,
            category,
            createdIngredients
        }

        //add the product to the products array
        this.products.push(product);

        return this.products[0];

    }

    async findProductByTitle(title) {
        // find the product by title
        const product = this.products.find(product => product.title === title);

        return product;
    }

    async findProductById(id) {
        // find the product by id
        const product = this.products.find(product => product.id === id);

        return product;
    }

    async deleteProduct(id) {

        this.products = this.products.filter(product => product.id !== id);
        
    }
}

module.exports = ProductsRepositoryInMemory;