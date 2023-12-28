const Router = require('express');

const ProductsController = require('../controllers/ProductsController');


// Create a new instance of the ProductsController class
const productsController = new ProductsController();

// Create a new instance of the Router class
const productsRoutes = Router();

// Create a route to deal with user routes
productsRoutes.post('/', productsController.create);
productsRoutes.get("/:id", productsController.show);
productsRoutes.get("/", productsController.index);
productsRoutes.put("/:id", productsController.update);
productsRoutes.delete("/:id", productsController.delete)

module.exports = productsRoutes;