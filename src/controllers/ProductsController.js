const ProductsRepository = require('../repositories/ProductsRepository');
const ProductsServices = require('../services/ProductsServices');


// Class to handle the products requests
class ProductsController {

     // create a new product
     async create(request, response) {
       const { title, price_in_cents, description, category, ingredients } = request.body;

       const productsRepository = new ProductsRepository();
       const productsServices = new ProductsServices(productsRepository);

       await productsServices.createProduct({ title, price: price_in_cents, description, category, ingredients });

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

     async update(request, response) {
          const { title, price_in_cents, description, category, ingredients } = request.body;
          const { id } = request.params;

          const productsRepository = new ProductsRepository();
          const productsServices = new ProductsServices(productsRepository);

          await productsServices.updateProduct({ id, title, price_in_cents, description, category, ingredients });

          return response.status(200).json({
               status: "success",
               message: "Produto atualizado com sucesso!"
          })
     }

     async delete(request, response) {
          const { id } = request.params;

          const productsRepository = new ProductsRepository();
          const productsServices = new ProductsServices(productsRepository);

          await productsServices.deleteProduct(id);

          return response.status(200).json({
               status: "success",
               message: "Produto deletado com sucesso!"
          })
     }

     async uploadImage(request, response) {
          const { filename } = request.file;
          console.log(filename);

          response.status(200).json({
               status: "success",
               message: "Imagem enviada com sucesso!",
          })
     }
}

module.exports = ProductsController;