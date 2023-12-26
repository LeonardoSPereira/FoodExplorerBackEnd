const ProductsRepository = require('../repositories/ProductsRepository');
const ProductsServices = require('../services/ProductsServices');


// Class to handle the products requests
class ProductsController {

    // create a new product
    async create(request, response) {
       const { name, price, description, category, ingredients } = request.body;

       const productsRepository = new ProductsRepository();
       const productsServices = new ProductsServices(productsRepository);

       await productsServices.createProduct({ name, price, description, category, ingredients });

         response.status(201).json({
              status: "success",
              message: "Produto criado com sucesso!"
         })
    }

}

module.exports = ProductsController;