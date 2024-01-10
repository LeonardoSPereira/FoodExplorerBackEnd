const ProductsRepository = require('../repositories/ProductsRepository');
const ProductsServices = require('../services/ProductsServices');

// Class to handle the products requests
class ProductsController {

     // create a new product
     async create(request, response) {
       const { title, price_in_cents, description, category, ingredients } = request.body;

       const productsRepository = new ProductsRepository();
       const productsServices = new ProductsServices(productsRepository);

       const productId = await productsServices.createProduct({ title, price: price_in_cents, description, category, ingredients });

         response.status(201).json({
              status: "Success",
              message: "Produto criado com sucesso!",
              productId: productId
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
               status: "Success",
               message: "Produto atualizado com sucesso!"
          })
     }

     async delete(request, response) {
          const { id } = request.params;

          const productsRepository = new ProductsRepository();
          const productsServices = new ProductsServices(productsRepository);

          await productsServices.deleteProduct(id);

          return response.status(200).json({
               status: "Success",
               message: "Produto deletado com sucesso!"
          })
     }

     // upload the image
     async uploadImage(request, response) {
          const { product_id } = request.params;
          const imageFileName = request.file.filename;

          const productsRepository = new ProductsRepository();
          const productsServices = new ProductsServices(productsRepository);

          await productsServices.uploadImage({ product_id, image: imageFileName });

          response.status(200).json({
               status: "Success",
               message: "Imagem salva com sucesso!",
          })
     }
}

module.exports = ProductsController;