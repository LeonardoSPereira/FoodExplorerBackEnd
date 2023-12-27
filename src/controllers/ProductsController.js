const ProductsRepository = require('../repositories/ProductsRepository');
const ProductsServices = require('../services/ProductsServices');


// Class to handle the products requests
class ProductsController {

    // create a new product
    async create(request, response) {
       const { name, price_in_cents, description, category, ingredients } = request.body;

       const productsRepository = new ProductsRepository();
       const productsServices = new ProductsServices(productsRepository);

       await productsServices.createProduct({ name, price: price_in_cents, description, category, ingredients });

         response.status(201).json({
              status: "success",
              message: "Produto criado com sucesso!"
         })
    }

     // list one products
     async show(request, response) {
          const { id } = request.params;

          const productsRepository = new ProductsRepository();
          const productsServices = new ProductsServices(productsRepository);

          const product = await productsServices.showOneProduct(id);

          return response.json( product )
     }

     // list all products
     async index(request, response) {
          const { filter } = request.query;


          const productsRepository = new ProductsRepository();
          const productsServices = new ProductsServices(productsRepository);

          const products = await productsServices.listProducts(filter);


          return response.json(products);
     }

}

module.exports = ProductsController;